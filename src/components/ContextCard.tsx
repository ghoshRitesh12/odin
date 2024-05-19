import { TypographyP } from "./typography/TP";
import { YoutubeIcon } from "./icon/YoutubeIcon";
import Link from "next/link";

type ContextCardProps = Readonly<{
  id: string;
  name: string;
}>;

// const iconTypeMap = {
//   yt_video: () => <YoutubeIcon className="dark:text-red-400 text-red-600" />,
//   web_page: () => <GlobeIcon className="dark:text-cyan-300 text-cyan-600" />,
//   pdf: () => <FilePdfIcon className="dark:text-orange-300 text-orange-500" />,
// };

export default function ContextCard({ name }: ContextCardProps) {
  return (
    <li className="mb-2 border-[1px] rounded-xl px-3 py-2 bg-secondary">
      <Link
        href={name}
        target="_blank"
      >
        <div className="flex items-center gap-3">
          <div className="flex-shrink-0">
            <YoutubeIcon className="dark:text-red-400 text-red-600" />
          </div>
          <TypographyP className="leading-5">{name}</TypographyP>
        </div>
      </Link>
    </li>
  );
}
