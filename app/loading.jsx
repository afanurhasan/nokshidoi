export default function RootLoading() {
  return (
    <div className="min-h-[50vh] flex flex-col items-center justify-center gap-3">
      <div className="size-10 rounded-full border-3 border-amber-200 border-t-amber-700 animate-spin" />
      <span className="text-xs font-bold text-amber-900 tracking-wider">
        নকশী দই লোড হচ্ছে...
      </span>
    </div>
  );
}
