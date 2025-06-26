import type {
  BangumiCollection,
  BangumiSubject,
} from "../types/bangumi";

type UserData = {
  anime: BangumiCollection;
  game: BangumiCollection;
};

const COLLECTION_TYPE = {
  WISH: 1, 
  COLLECT: 2, 
  DOING: 3, 
};

const API_BASE = "https://api.bgm.tv";

/**
 * 获取用户收藏
 * @param username Bangumi 用户名
 * @param subjectType 条目类型 (2=动画, 4=游戏)
 * @param collectionType 收藏类型 (2=看过/玩过, 1=想看/想玩, 3=在看/在玩)
 * @param page 页码（从1开始）
 * @param pageSize 每页条数
 */
export async function getUserCollection(
  username: string,
  subjectType: 2 | 4,
  collectionType: "collect" | "wish" | "doing",
  page: number = 1,
  pageSize: number = 10
): Promise<BangumiSubject[]> {
  let typeValue: number;
  switch (collectionType) {
    case "wish": typeValue = COLLECTION_TYPE.WISH; break;
    case "collect": typeValue = COLLECTION_TYPE.COLLECT; break;
    case "doing": typeValue = COLLECTION_TYPE.DOING; break;
    default: typeValue = COLLECTION_TYPE.COLLECT;
  }
  
  // 确保页码和每页条数为有效值
  const validPageSize = Math.min(50, Math.max(1, pageSize));
  
  // 计算偏移量
  const offset = Math.max(0, (Math.max(1, page) - 1) * validPageSize);
  
  try {
    // 构建请求URL
    const url = `${API_BASE}/v0/users/${encodeURIComponent(username)}/collections`;
    
    // 构建查询参数
    const params = new URLSearchParams({
      subject_type: subjectType.toString(),
      type: typeValue.toString(),
      limit: validPageSize.toString(),
      offset: offset.toString()
    });
    
    const fullUrl = `${url}?${params.toString()}`;
    
    const response = await fetch(fullUrl, {
      headers: {
        "User-Agent": "shenley-homepage-nextjs (https://github.com/shenlye/shenley-homepage-nextjs)",
        "Accept": "application/json"
      }
    });

    if (!response.ok) {
      const errorText = await response.text().catch(() => '无法获取错误详情');
      console.error(`获取用户收藏失败: HTTP ${response.status}`, errorText);
      
      if (response.status === 404) {
        console.warn(`用户 ${username} 不存在或未公开收藏`);
      }
      
      throw new Error(errorText || `获取用户收藏失败: HTTP ${response.status}`);
    }

    const data = await response.json();
    
    if (!data.data || !Array.isArray(data.data) || data.data.length === 0) {
      console.log(`用户 ${username} 的 ${collectionType} 收藏为空`);
      return [];
    }
    
    return data.data.map((item: Record<string, unknown>) => {
      const subject = item.subject as Record<string, unknown>;
      if (!subject) return null;
      
      // 提取用户评分和评论
      const userRating = item.rate != null ? Number(item.rate) : undefined;
      const userComment = item.comment ? String(item.comment) : undefined;
      
      return {
        id: Number(subject.id),
        name: String(subject.name || ''),
        name_cn: String(subject.name_cn || ''),
        images: subject.images as BangumiSubject['images'],
        url: `https://bgm.tv/subject/${subject.id}`,
        type: Number(subject.type) as BangumiSubject['type'],
        // 直接从subject中提取评分信息
        rating: {
          score: subject.score != null ? Number(subject.score) : undefined,
          total: subject.collection_total != null ? Number(subject.collection_total) : undefined
        },
        summary: subject.short_summary as string || subject.summary as string,
        // 添加用户评分和评论
        user_rating: userRating,
        user_comment: userComment
      };
    }).filter(Boolean) || [];
  } catch (error) {
    console.error(`获取收藏失败:`, error);
    throw error;
  }
}

/**
 * 获取所有用户收藏（包括动画和游戏）
 * @param username Bangumi 用户名
 * @param page 页码（从1开始）
 * @param pageSize 每页条数
 */
export async function getAllUserCollections(
  username: string,
  page: number = 1,
  pageSize: number = 10
): Promise<UserData> {
  
  const animeCollect = await getUserCollection(username, 2, "collect", page, pageSize);
  const animeWish = await getUserCollection(username, 2, "wish", page, pageSize); 
  const animeDoing = await getUserCollection(username, 2, "doing", page, pageSize);
  
  const gameCollect = await getUserCollection(username, 4, "collect", page, pageSize);
  const gameWish = await getUserCollection(username, 4, "wish", page, pageSize);
  const gameDoing = await getUserCollection(username, 4, "doing", page, pageSize);
  
  return {
    anime: {
      collect: animeCollect,
      wish: animeWish,
      doing: animeDoing
    },
    game: {
      collect: gameCollect,
      wish: gameWish,
      doing: gameDoing
    }
  };
}

/**
 * 获取用户特定类型的收藏
 * @param username Bangumi 用户名
 * @param type 类型 ("anime" | "game")
 * @param page 页码（从1开始） 
 * @param pageSize 每页条数
 */
export async function getUserCollectionsByType(
  username: string,
  type: "anime" | "game",
  page: number = 1,
  pageSize: number = 10
): Promise<BangumiCollection> {
  const subjectType = type === "anime" ? 2 : 4;
  
  const [collect, wish, doing] = await Promise.all([
    getUserCollection(username, subjectType, "collect", page, pageSize),
    getUserCollection(username, subjectType, "wish", page, pageSize),
    getUserCollection(username, subjectType, "doing", page, pageSize)
  ]);
  
  return {
    collect,
    wish,
    doing
  };
}

/**
 * 获取用户特定类型和状态的收藏
 * @param username Bangumi 用户名
 * @param type 类型 ("anime" | "game")
 * @param status 收藏状态 ("collect" | "wish" | "doing")
 * @param page 页码（从1开始）
 * @param pageSize 每页条数
 */
export async function getUserCollectionsByStatus(
  username: string,
  type: "anime" | "game",
  status: "collect" | "wish" | "doing",
  page: number = 1,
  pageSize: number = 10
): Promise<BangumiCollection> {
  const subjectType = type === "anime" ? 2 : 4;
  
  try {
    const items = await getUserCollection(username, subjectType, status, page, pageSize);
    
    const result: BangumiCollection = {
      collect: [],
      wish: [],
      doing: []
    };
    
    result[status] = items;
    
    return result;
  } catch (error) {
    console.error(`获取${type}/${status}收藏失败:`, error);
    return {
      collect: [],
      wish: [],
      doing: []
    };
  }
}
