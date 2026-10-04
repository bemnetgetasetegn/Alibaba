import { Header } from '@/components/public/Header';
import { Footer } from '@/components/public/Footer';
import { Skeleton } from '@/components/ui/Skeleton';

export default function ProductLoading() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />
      
      <main className="flex-1">
        <div className="max-w-[1580px] mx-auto px-4 md:px-10 pt-4 pb-12">
          {/* Breadcrumb skeleton */}
          <Skeleton className="w-48 h-4 mb-4" />
          
          <div className="flex flex-col lg:flex-row gap-6 mt-4">
            {/* Left */}
            <div className="w-full lg:w-[400px] xl:w-[600px]">
              <Skeleton className="w-full aspect-square rounded-lg" />
              <Skeleton className="w-full h-32 mt-6 rounded-lg hidden lg:block" />
            </div>

            {/* Middle */}
            <div className="flex-1 lg:max-w-[650px]">
              <Skeleton className="w-full h-8 mb-2" />
              <Skeleton className="w-2/3 h-8 mb-4" />
              
              <Skeleton className="w-48 h-4 mb-4" />

              <Skeleton className="w-full h-32 rounded-lg mb-6" />

              <div className="space-y-6">
                <Skeleton className="w-full h-12 rounded-lg" />
                <Skeleton className="w-full h-12 rounded-lg" />
              </div>
            </div>

            {/* Right */}
            <div className="w-full lg:w-[320px] xl:w-[400px]">
              <Skeleton className="w-full h-[400px] rounded-lg" />
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
