import { create } from "zustand";

type NavItem = {
    name: string;
    href: string;
    hint: string;
}

type PreviewState = {
    currentPage: NavItem;
    hoverItem: NavItem | null;
    setCurrentPage: (item: NavItem) => void;
    setHoverItem: (item: NavItem | null) => void;
}

const defaultPage = {
    name: "HOME",
    href: "/",
    hint: "当前页面提示，未完成"
};

export const usePreviewStore = create<PreviewState>((set) => ({
    currentPage: defaultPage,
    hoverItem: null,
    setCurrentPage: (item) => set({ currentPage: item }),
    setHoverItem: (item) => set({ hoverItem: item }),
}));

export const navItems: NavItem[] = [
    defaultPage,
    {
        name: "BLOG",
        href: "/blog",
        hint: "博客文章，写的真的很烂"
    },
    {
        name: "PROJECTS",
        href: "/projects",
        hint: "项目展示，啥都木有"
    },
    {
        name: "GAME",
        href: "/bangumi/game",
        hint: "游戏收藏，还没完善"
    },
    {
        name: "ANIME",
        href: "/bangumi/anime",
        hint: "动画收藏，还没完善"
    },
];