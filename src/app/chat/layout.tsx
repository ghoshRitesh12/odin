type ChatLayoutProps = Readonly<{
  children: React.ReactNode;
}>;

export default function ChatLayout({ children }: ChatLayoutProps) {
  return (
    <div>
      <div>{children}</div>
      <div>this text is from chat layout</div>
    </div>
  );
}
