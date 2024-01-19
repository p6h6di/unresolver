"use client";

import { PostSchema, PostValidation } from "@/lib/validation/post";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import TextareaAutosize from "react-textarea-autosize";
import type EditorJS from "@editorjs/editorjs";
import { toast } from "sonner";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { uploadFiles } from "@/lib/uploadthing";
import { useRouter } from "next/navigation";

const Editor = () => {
  //* * Editor Validation */
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PostValidation>({
    resolver: zodResolver(PostSchema),
    defaultValues: {
      title: "",
      content: null,
    },
  });

  const ref = useRef<EditorJS>();
  const [isMounted, setIsMounted] = useState<boolean>(false);
  const _titleRef = useRef<HTMLTextAreaElement>(null);
  const router = useRouter();

  //* * Initializing Editor */
  const initializeEditor = useCallback(async () => {
    const EditorJS = (await import("@editorjs/editorjs")).default;
    const Header = (await import("@editorjs/header")).default;
    const Embed = (await import("@editorjs/embed")).default;
    const Table = (await import("@editorjs/table")).default;
    const List = (await import("@editorjs/list")).default;
    const Code = (await import("@editorjs/code")).default;
    const InlineCode = (await import("@editorjs/inline-code")).default;
    const LinkTool = (await import("@editorjs/link")).default;
    const ImageTool = (await import("@editorjs/image")).default;

    if (!ref.current) {
      const editor = new EditorJS({
        holder: "editor",
        onReady() {
          ref.current = editor;
        },
        placeholder: "Type here to write your post...",
        inlineToolbar: true,
        data: { blocks: [] },
        tools: {
          header: Header,
          list: List,
          LinkTool: {
            class: LinkTool,
            config: {
              endpoint: "/api/link",
            },
          },
          image: {
            class: ImageTool,
            config: {
              uploader: {
                async uploadByFile(file: File) {
                  const [res] = await uploadFiles([file], "imageUploader");
                  console.log(res);
                  return {
                    success: 1,
                    file: {
                      url: res.fileUrl,
                    },
                  };
                },
              },
            },
          },
          code: Code,
          inlineCode: InlineCode,
          table: Table,
          embed: Embed,
        },
      });
    }
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsMounted(true);
    }
  }, []);

  //* * Handling Editor Errors */
  useEffect(() => {
    if (Object.keys(errors).length) {
      for (const [_key, value] of Object.entries(errors)) {
        toast.error((value as { message: string }).message);
      }
    }
  }, [errors]);

  useEffect(() => {
    const init = async () => {
      await initializeEditor();

      setTimeout(() => {
        // set focus to title
        // if (_titleRef.current) {
        //   _titleRef.current?.focus();
        // }
      }, 0);
    };

    if (isMounted) {
      init();
      return () => {
        ref.current?.destroy();
        ref.current = undefined;
      };
    }
  }, [isMounted, initializeEditor]);

  //* * Sending Data To Server */
  const { mutate: createPost } = useMutation({
    mutationFn: async ({ title, content }: PostValidation) => {
      const payload: PostValidation = {
        title,
        content,
      };
      const { data } = await axios.post("/api/editor", payload);
      return data;
    },
    onError: (error) => {
      console.log(error);
      return toast.error(
        "Your post was not published, please try again later."
      );
    },
    onSuccess: () => {
      router.refresh();
      router.push("/");
      return toast.success("Your post has been published");
    },
  });

  //* * Preparing Editor Data */
  const onSubmit = async (values: PostValidation) => {
    const blocks = await ref.current?.save(); // editor data

    const payload: PostValidation = {
      title: values.title,
      content: blocks,
    };
    createPost(payload);
  };

  if (!isMounted) {
    return null;
  }

  const { ref: titleRef, ...rest } = register("title");

  return (
    <div className="m-4  rounded-lg  border-zinc-200 bg-zinc-100 p-4">
      <form
        id="unresolver-post-form"
        className="w-full"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="prose prose-stone dark:prose-invert">
          <TextareaAutosize
            ref={(e) => {
              titleRef(e);
              // @ts-ignore
              _titleRef.current = e;
            }}
            {...rest}
            placeholder="Title"
            className="w-full resize-none appearance-none overflow-hidden bg-transparent text-5xl font-bold placeholder:text-gray-300 focus:outline-none"
          />
          <div id="editor" className="min-h-[420px]" />
        </div>
      </form>
    </div>
  );
};

export default Editor;
