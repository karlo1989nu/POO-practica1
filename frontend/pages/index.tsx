import Login from "./login";
import Registrar from "./page";

export default function Home() {
  return (
    <div style={{ display: "flex", gap: "2rem" }}>
      <Login />
      <Registrar />
    </div>
  );
}
