import type { TabTypes, InventoryNavTypes } from "@/types/inventory/types";

export default function MobileDropdown({
  selectedTab,
  setSelectedTab,
  tabs,
}: InventoryNavTypes) {
  return (
    <div className="sm:hidden">
      <label htmlFor="tabs" className="sr-only">
        Select a tab
      </label>
      <select
        id="tabs"
        name="tabs"
        value={selectedTab}
        onChange={(e) => setSelectedTab(e.target.value)}
        className="block w-full rounded-lg border-neutral-mid focus:border-accent focus:ring-accent"
      >
        {tabs.map((tab: TabTypes) => (
          <option key={tab.name} value={tab.name}>
            {tab.name}
          </option>
        ))}
      </select>
    </div>
  );
}
