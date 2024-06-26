export const timeAgo = (timeStamp: number) => {
    const now = Date.now();
    const secondsAgo = Math.floor((now - timeStamp) / 1000);

    if (secondsAgo < 60) {
        return `${secondsAgo}s ago`;
    } else if (secondsAgo < 3600) {
        const minutesAgo = Math.floor(secondsAgo / 60);
        return `${minutesAgo}m ago`;
    } else if (secondsAgo < 86400) {
        const hoursAgo = Math.floor(secondsAgo / 3600);
        return `${hoursAgo}h ago`;
    } else if (secondsAgo < 604800) {
        const dayAgo = Math.floor(secondsAgo / 86400);
        return `${dayAgo}d ago`;
    } else {
        const weekAgo = Math.floor(secondsAgo / 604800);
        return `${weekAgo}w ago`;
    }
};