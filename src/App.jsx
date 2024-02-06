import StarfieldButton from "./components/StarfieldButton";

function App() {
  return (
    <main>
      <StarfieldButton letter="w" onClick={() => alert("H")} />
      <StarfieldButton letter="e" onClick={() => alert("H")} />
    </main>
  );
}

export default App;
