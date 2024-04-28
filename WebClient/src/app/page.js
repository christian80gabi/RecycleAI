import Image from "next/image";
import avatar from "./assets/avatar.jpg";
import crumpledPaper from "./assets/crumpled_paper.png";
import glass from "./assets/glass.png";
import bottle from "./assets/plastic_bottle.png";
import bag from "./assets/plastic_bag.png";
import Link from "next/link";

export default function Home() {

  return (
    <main className="min-h-screen max-w-5xl mx-auto flex-col pt-12 px-12">
      <div className="flex items-center">
        <Image
          src={avatar}
          width={72}
          height={72}
          className="rounded-3xl mr-3"
        />{" "}
        <p className="text-2xl">
          <span className="text-neutral-500">Hi</span>, Recycler!
        </p>
      </div>
      <div className="mt-8">
        <div className="flex items-center justify-evenly">
          <div className="">
            <p className="text-9xl font-medium">500g</p>
            <p className="text-2xl">
              saved CO<span className="relative top-1 text-lg">2</span>
            </p>
          </div>
          <div className="bg-neutral-300 h-36 w-0.5"></div>
          <div>
            <div className="flex flex-col items-center">
              <p className="text-3xl">343</p>
              <p>points</p>
            </div>
            <div className="mt-4 flex flex-col items-center">
              <p className="text-3xl">43</p>
              <p>recycled</p>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-16">
        <h3 className="font-medium text-neutral-500 text-lg">
          Today's challenge
        </h3>
        <div className="bg-primary-green text-center py-16 mt-4 rounded-xl">
          <p className="text-6xl font-semibold mb-3">Earn 5 points</p>
          <p>and recycle a plastic bottle to earn rewards.</p>
        </div>
      </div>
      <div className="mt-16">
        <h3 className="font-medium text-neutral-500 text-lg">Recycling Tips</h3>
        <div className="mt-4 flex items-center gap-x-2">
          <p className="w-1/3 text-xl">
            Get to know some of our favorite ways to recycle.
          </p>
          <div className="flex flex-col sm:flex-row gap-x-4 overflow-auto">
            {[
              { name: "Paper", src: crumpledPaper },
              { name: "Bottle", src: bottle },
              { name: "Glass", src: glass },
              { name: "Bag", src: bag },
            ].map((item) => {
              return (
                <Link
                  href={"#"}
                  className="inline-block flex-col text-center"
                  key={item.name}
                >
                  <Image
                    className="bg-neutral-100 rounded-2xl"
                    src={item.src}
                    width={170}
                    height={170}
                  />
                  <p className="mt-2 text-neutral-600">{item.name}</p>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </main>
  );
}
