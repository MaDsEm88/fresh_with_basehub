import { cn } from "@/utils/cn.ts";

type PostStatusType = "Update" | "Engineering" | string; // Define a union type for the possible values of status

export function PostStatus({ status }: { status: PostStatusType }) {
  return (
    <div
      className={cn(
        "border rounded-md px-2 py-1 inline-block text-[10px] font-medium mb-4",
        status === "Update" && "border-[#DFB31D] text-[#DFB31D]",
        status === "Engineering" && "border-[#34b285] text-[#34b285]"
      )}
    >
      {status}
    </div>
  );
}
