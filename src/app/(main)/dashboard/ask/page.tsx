import { AskPageContent } from "./_components/ask-page-content";

export default function AskPage() {
  return (
    <div data-content-padding="false" className="flex h-[calc(100vh-var(--dashboard-header-height)-var(--spacing)*4)] flex-col md:h-[calc(100vh-var(--dashboard-header-height)-var(--spacing)*6)]">
      <AskPageContent />
    </div>
  );
}
