import { Meme } from "../store/types/meme";

export const likeClass = "text-blue-400";
export const disLikeClass = "text-red-400";
export const testUser = {
    id: "2",
    username: "test"
};

export const getTestMeme = (type:string):Meme => ({
    id: "1",
    heading: "Test Meme",
    likes: ["1","2"],
    dislikes: ["3","4"],
    user: {
        _id: "2",
        username: "test"
    },
    thumbnail_url: "test.jpg",
    image_url: "test.png",
    view_count: 12,
    state: "",
    type,
    status: "SAVED"
});

export const MemeLoadableCard = {
    isLoading: true
};