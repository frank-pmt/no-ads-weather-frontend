
import HomeComponent from "@/components/home-component";


export default function Home() {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  console.log("API URL:", apiUrl);
  return (
    <main className="min-h-screen flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-center mb-8">
          Weather Forecast
        </h1>
        <HomeComponent />
      </div>
    </main>
  );
}


