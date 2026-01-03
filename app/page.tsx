import NavBar from "./_components/NavBar";

export default function Home() {
  return (
    <div
      className="w-screen h-screen overflow-hidden antialiased
        flex flex-col"
    >
      
      <NavBar />
      <div className="flex-1"><h1>Hello world!</h1></div>
    </div>
  );
}
