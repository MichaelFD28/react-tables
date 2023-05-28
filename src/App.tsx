import MockTable from "./components/MockDataTable/MockTable";

function App() {
  return (
    <div className="w-full bg-neutral-300 min-h-screen p-12">
      <div className="w-full flex flex-col gap-4">
        <p className="text-3xl font-bold text-teal-950">Interactive table</p>
        <p className="text-lg text-teal-900">try me out...</p>
        <MockTable />
        <p>
          This table is interactive, try swapping the columns around or hiding
          some of them!
        </p>
      </div>
    </div>
  );
}

export default App;
