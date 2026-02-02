
type HeaderProps = {
    onMenuClick: React.MouseEventHandler<HTMLButtonElement>
}

export default function Header({ onMenuClick }: HeaderProps) {
  return (
    <header className="flex items-center gap-3 p-4  md:hidden">
      <button
        onClick={onMenuClick}
        className="py-1 px-3 rounded border border-gray-300 cursor-pointer font-black shadow"
      >
        ☰
      </button>
    </header>
  )
}
