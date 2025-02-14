import { signIn } from "@/auth";
import { Button, Card, CardContent, Input } from "@/components/ui";
import { Lock, Phone } from "lucide-react";
import { redirect } from "next/navigation";

export default async function SignIn({ searchParams }) {
  return (
    <div className="min-h-screen w-full flex items-center justify-center p-4">
      <div className="w-full flex justify-center items-center relative h-full">
        <img
          src="/illustration3.svg"
          alt="Sign In"
          className="object-contain w-[80vw] h-[70vh] absolute -z-10"
        />

        <Card className="shadow-2xl p-6 bg-blue-500/10 backdrop-blur-xl rounded-2xl z-10">
          <CardContent>
            <div className="flex flex-col items-center mb-6 w-96">
              <h1 className="text-3xl font-bold text-blue-600 uppercase mb-5">
                Sat Communication
              </h1>
              <h2 className="text-2xl font-bold text-gray-800">Welcome Back</h2>
              <p className="text-gray-500 text-sm">Sign in to continue</p>
            </div>

            {/* Display Error Message */}
            {searchParams?.error && (
              <p className="text-red-500 text-sm mb-4 text-center">
                {searchParams.error}
              </p>
            )}

            <form
              action={async (formData) => {
                "use server";
                try {
                  await signIn("credentials", formData);
                } catch (error) {
                  console.error("Error signing in:", error);
                  return redirect(`/login?error=Invalid phone number or password`);
                }
              }}
              className="flex flex-col gap-4"
            >
              <label className="flex items-center gap-2 p-2 rounded-lg">
                <Phone className="text-gray-500" size={20} />
                <Input
                  name="phone"
                  type="tel"
                  placeholder="Mobile number"
                  className="bg-transparent focus:outline-none flex-1"
                />
              </label>

              <label className="flex items-center gap-2 p-2 rounded-lg">
                <Lock className="text-gray-500" size={20} />
                <Input
                  name="password"
                  type="password"
                  placeholder="Password"
                  className="bg-transparent focus:outline-none flex-1"
                />
              </label>

              <div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-lg font-semibold shadow-lg">
                  Sign In
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
