import { SignIn } from "@clerk/nextjs";

export default function Page() {
  return (
    <>
      <div className="flex justify-center items-center p-24 min-h-screen bg-black">
        <SignIn />;
      </div>
    </>
  );
}
