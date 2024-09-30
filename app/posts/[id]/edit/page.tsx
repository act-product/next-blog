// // "use client";

// // import { useRouter } from "next/navigation";
// // import { useState, useEffect } from "react";
// // import { z } from "zod";
// // import { useForm } from "react-hook-form";
// // import { zodResolver } from "@hookform/resolvers/zod";
// // import { toast, ToastContainer } from "react-toastify";
// // import "react-toastify/dist/ReactToastify.css";
// // import { useParams } from "next/navigation";

// // const schema = z.object({
// //     title: z.string().min(1, "タイトルは必須です"),
// //     content: z.string().min(1, "内容は必須です"),
// //     thumbnail: z.instanceof(File).optional(),
// // });

// // const EditPostPage = () => {
// //     const router = useRouter();
// //     const { id } = useParams();
// //     const [post, setPost] = useState(null);

// //     const { register, handleSubmit, setValue } = useForm({
// //         resolver: zodResolver(schema),
// //     });

// //     useEffect(() => {
// //         const fetchPost = async () => {
// //             const response = await fetch(`/api/posts/${id}`);
// //             const data = await response.json();
// //             setPost(data);
// //             setValue("title", data.title);
// //             setValue("content", data.content);
// //         };

// //         if (id) {
// //             fetchPost();
// //         }
// //     }, [id, setValue]);

// //     const onSubmit = async (data) => {
// //         const formData = new FormData();
// //         formData.append("id", id);
// //         formData.append("title", data.title);
// //         formData.append("content", data.content);
// //         if (data.thumbnail[0]) {
// //             formData.append("thumbnail", data.thumbnail[0]);
// //         }

// //         await fetch(`/api/posts/${id}/edit`, {
// //             method: 'POST',
// //             body: formData,
// //         });

// //         toast.success("更新しました");
// //         router.push(`/posts/${id}`);
// //     };

// //     if (!post) return <div>読み込み中...</div>;

// //     return (
// //         <div>
// //             <h1>記事を編集</h1>
// //             <ToastContainer />
// //             <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
// //                 <div>
// //                     <label>タイトル</label>
// //                     <input {...register("title")} />
// //                 </div>
// //                 <div>
// //                     <label>内容</label>
// //                     <textarea {...register("content")} />
// //                 </div>
// //                 <div>
// //                     <label>サムネイル画像（オプション）</label>
// //                     <input type="file" {...register("thumbnail")} />
// //                 </div>
// //                 <button type="submit">更新</button>
// //             </form>
// //         </div>
// //     );
// // };

// // export default EditPostPage;

// "use client";

// import { useRouter } from "next/navigation";
// import { useState, useEffect } from "react";
// import { z } from "zod";
// import { useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { toast, ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import { useParams } from "next/navigation";
// import Image from "next/image";

// const schema = z.object({
//     title: z.string().min(1, "タイトルは必須です"),
//     content: z.string().min(1, "内容は必須です"),
//     thumbnail: z.instanceof(File).optional(),
// });

// const EditPostPage = () => {
//     const router = useRouter();
//     const { id } = useParams();
//     const [post, setPost] = useState(null);

//     const { register, handleSubmit, setValue } = useForm({
//         resolver: zodResolver(schema),
//     });

//     useEffect(() => {
//         const fetchPost = async () => {
//             const response = await fetch(`/api/posts/${id}`);
//             const data = await response.json();
//             console.log(data); // ここでデータを確認
//             setPost(data);
//             setValue("title", data.title);
//             setValue("content", data.content);
//         };

//         if (id) {
//             fetchPost();
//         }
//     }, [id, setValue]);

//     const onSubmit = async (data) => {
//         const formData = new FormData();
//         formData.append("id", id);
//         formData.append("title", data.title);
//         formData.append("content", data.content);
//         if (data.thumbnail?.[0]) {
//             formData.append("thumbnail", data.thumbnail[0]);
//         }

//         await fetch(`/api/posts/${id}/edit`, {
//             method: 'POST',
//             body: formData,
//         });

//         toast.success("更新しました");
//         router.push(`/posts/${id}`);
//     };

//     if (!post) return <div>読み込み中...</div>;

//     // サムネイルURLの構築
//     let thumbnailUrl = post.thumbnail ? `/${post.thumbnail}` : "/public/default-thumbnail.jpeg";
//     console.log(post.thumbnail)
//     // URLをチェックして適切な形式に修正
//     if (!thumbnailUrl.startsWith("http") && !thumbnailUrl.startsWith("/")) {
//         console.error("Invalid thumbnail URL:", thumbnailUrl); // 無効なURLをコンソールに表示
//         thumbnailUrl = "/default-thumbnail.png"; // 無効な場合はデフォルト画像を使用
//     }

//     return (
//         <div>
//             <h1>記事を編集</h1>
//             <ToastContainer />
//             <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
//                 <div>
//                     <label>タイトル</label>
//                     <input {...register("title")} />
//                 </div>
//                 <div>
//                     <label>内容</label>
//                     <textarea {...register("content")} />
//                 </div>
//                 <div>
//                     <label>サムネイル画像（オプション）</label>
//                     <input type="file" {...register("thumbnail")} />
//                 </div>
//                 <div>
//                     <Image
//                         src={thumbnailUrl}
//                         alt="記事のサムネイル"
//                         width={500}
//                         height={300}
//                         priority={true}
//                     />
//                 </div>
//                 <button type="submit">更新</button>
//             </form>
//         </div>
//     );
// };

// export default EditPostPage;

"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useParams } from "next/navigation";

const schema = z.object({
    title: z.string().min(1, "タイトルは必須です"),
    content: z.string().min(1, "内容は必須です"),
    thumbnail: z.instanceof(File).optional(),
});

const EditPostPage = () => {
    const router = useRouter();
    const { id } = useParams();
    const [post, setPost] = useState(null);

    const { register, handleSubmit, setValue } = useForm({
        resolver: zodResolver(schema),
    });

    useEffect(() => {
        const fetchPost = async () => {
            try {
                const response = await fetch(`/api/posts/${id}`);
                const data = await response.json();
                setPost(data);
                setValue("title", data.title);
                setValue("content", data.content);
            } catch (error) {
                toast.error("記事の取得に失敗しました");
            }
        };

        if (id) {
            fetchPost();
        }
    }, [id, setValue]);

    const onSubmit = async (data) => {
        const formData = new FormData();
        formData.append("id", id);
        formData.append("title", data.title);
        formData.append("content", data.content);
        if (data.thumbnail && data.thumbnail[0]) {
            formData.append("thumbnail", data.thumbnail[0]);
        }

        try {
            const response = await fetch(`/api/posts/${id}/edit`, {
                method: 'POST',
                body: formData,
            });

            if (response.ok) {
                toast.success("更新しました");
                router.push(`/posts/${id}`);
            } else {
                toast.error("更新に失敗しました");
            }
        } catch (error) {
            toast.error("更新中にエラーが発生しました");
        }
    };

    if (!post) return <div>読み込み中...</div>;

    return (
        <div>
            <h1>記事を編集</h1>
            <ToastContainer />
            <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
                <div>
                    <label>タイトル</label>
                    <input {...register("title")} />
                </div>
                <div>
                    <label>内容</label>
                    <textarea {...register("content")} />
                </div>
                <div>
                    <label>サムネイル画像（オプション）</label>
                    <input type="file" {...register("thumbnail")} />
                </div>
                <button type="submit">更新</button>
            </form>
        </div>
    );
};

export default EditPostPage;


