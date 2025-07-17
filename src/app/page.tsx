import Link from "next/link";
import Image from "next/image";
import {
  Download,
  Github,
  Linkedin,
  type LucideIcon,
  Mail,
  MoveRight,
  Send,
  Youtube,
} from "lucide-react";
import {
  getExperiences,
  getPortfolios,
  getProfile,
} from "@/features/landing/actions";
import type { ReactElement } from "react";
import NavBar from "@/components/navbar";
import { Badge } from "@/components/ui/badge";

interface Tools {
  alt: string;
  image: string;
}

interface Account {
  icon: ReactElement<LucideIcon>;
  href: string;
}

export default async function Home() {
  const [me, portfolios, experiences] = await Promise.all([
    getProfile(),
    getPortfolios(),
    getExperiences(),
  ]);

  const myAccount: Account[] = [
    {
      icon: <Github />,
      href: "https://github.com/anjarmath",
    },
    {
      icon: <Linkedin />,
      href: "https://www.linkedin.com/in/anjar2hariadi/",
    },
    {
      icon: <Mail />,
      href: `mailto:creative.anjar@gmail.com`,
    },
    {
      icon: <Youtube />,
      href: "https://www.youtube.com/@an.alphaleonis",
    },
  ];

  const myTool: Tools[] = [
    {
      alt: "Flutter",
      image: "mytools/flutter.svg",
    },
    {
      alt: "Go Lang",
      image: "mytools/go.svg",
    },
    {
      alt: "React JS",
      image: "mytools/react.svg",
    },
    // {
    //   alt: "Next JS",
    //   image: "mytools/next.svg",
    // },
    {
      alt: "Vue JS",
      image: "mytools/vue.svg",
    },
    // {
    //   alt: "Nuxt JS",
    //   image: "mytools/nuxt.svg",
    // },
    {
      alt: "Figma",
      image: "mytools/figma.svg",
    },
  ];

  return (
    <main className="scroll-smooth">
      <NavBar />

      {/* Hero Section */}
      <div id="home" className="bg-hprimary-dark grid min-h-screen px-4 py-16">
        <div className="mx-auto flex max-w-5xl flex-col-reverse items-center gap-8 md:flex-row">
          <div className="flex flex-[3] flex-col gap-4">
            <h1 className="text-4xl font-bold text-white">
              <span className="text-hprimary-light">Congratulation!</span> 🙌,
              you have come to the right place!
            </h1>
            <span className="mb-5 text-lg text-white">
              Hello, my name is
              <span className="font-bold"> Anjar Dwi Hariadi</span>.
              {me?.greeting}
            </span>
            <Link href={"#contact"}>
              <button className="bg-hprimary hover:bg-hprimary-light w-full rounded-lg px-6 py-4 text-white transition-colors hover:text-black md:w-auto">
                Get Started
              </button>
            </Link>
            <div className="mt-4 flex gap-6">
              {myAccount.map((account, index) => (
                <Link
                  href={account.href}
                  key={index}
                  className="hover:text-hprimary text-white transition-colors"
                >
                  {account.icon}
                </Link>
              ))}
            </div>
          </div>

          <div className="flex-[2]">
            <div className="bg-hprimary-light absolute mx-8 my-4 rounded-t-full rounded-l-full p-3">
              <span className="text-5xl">{me?.mood}</span>
            </div>
            <Image
              width={3000}
              height={3000}
              alt="anjar"
              src={"/hero-image.png"}
            ></Image>
          </div>
        </div>
      </div>

      {/* New Info Banner */}
      <div className="bg-red-50 px-5 py-8">
        <div className="mx-auto flex max-w-5xl items-center justify-center gap-5">
          <span>
            <b className="text-red-500">NEW:</b> Now I am on Youtube
          </span>
          <Link href={"https://www.youtube.com/@an.alphaleonis"}>
            <button className="flex w-full items-center gap-2 rounded-md bg-red-500 px-4 py-2 text-white transition-colors hover:bg-red-600 md:w-auto">
              <Youtube /> Visit My Channel
            </button>
          </Link>
        </div>
      </div>

      {/* Profile Desc */}
      <div id="profile" className="px-5 py-8">
        <div className="mx-auto flex max-w-5xl flex-col gap-6 md:flex-row">
          <div className="flex-[2]">
            <Image
              alt=""
              src={me?.image ?? "/me.jpg"}
              width={1000}
              height={1000}
              className="border-hprimary-dark aspect-square w-full rounded-3xl border-2 object-cover"
            />
          </div>
          <div className="flex flex-[3] flex-col gap-2">
            <span className="text-hprimary text-lg font-bold">About Me</span>
            <h1 className="text-4xl font-bold">{me?.descTitle}</h1>
            <p className="mb-3 text-slate-700">{me?.descContent}</p>
            <Link
              href={`${me?.resume}`}
              className="hover:text-hprimary flex items-center gap-2 text-lg font-bold transition-colors"
            >
              <Download />
              Resume
            </Link>
          </div>
        </div>
      </div>

      {/* My Tools */}
      <div id="tools" className="px-5 py-8">
        <div className="mx-auto flex max-w-5xl items-center">
          <h3 className="mr-5 text-lg font-bold">Tools</h3>
          <div className="flex flex-wrap gap-3">
            {myTool.map((tool, index) => (
              <Image
                width={200}
                height={200}
                key={index}
                alt={tool.alt}
                src={tool.image}
                className="aspect-square w-10 object-contain opacity-100 transition-opacity hover:opacity-60"
              ></Image>
            ))}
          </div>
        </div>
      </div>

      {/* Experience */}
      <div id="experience" className="bg-slate-950 px-5 py-8">
        <div className="mx-auto flex max-w-2xl flex-col items-center gap-5">
          <span className="text-hprimary text-lg font-bold">Experience</span>
          {experiences.map((experience, index) => (
            <div
              key={index}
              className="w-full rounded-xl bg-slate-900 px-5 py-3 text-white"
            >
              <h2 className="mb-2 font-bold">{experience.company}</h2>
              <h4 className="mb-2">{experience.title}</h4>
              <span className="text-sm font-light text-slate-500">
                {experience.period}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* My portfolio */}
      <div id="portfolio" className="bg-hprimary-xlight px-5 py-8">
        <div className="mx-auto flex max-w-5xl flex-col items-center gap-5">
          <span className="text-hprimary text-lg font-bold">Portfolio</span>
          <h1 className="text-4xl font-bold">
            Enjoying every process and here’s the results
          </h1>
          <div className="flex flex-wrap justify-center gap-3">
            {portfolios.map((portfolio) => (
              <div
                key={portfolio.id}
                className="hover:border-hprimary rounded-xl border-2 bg-white p-3 shadow-lg transition-all hover:shadow-2xl md:w-[48%]"
              >
                <Image
                  alt={portfolio.title}
                  src={portfolio.image ?? "/no-image.webp"}
                  width={1200}
                  height={800}
                  className="aspect-video rounded-lg object-cover"
                ></Image>
                <h3 className="mt-4 font-bold">{portfolio.title}</h3>
                <div className="my-2 flex flex-wrap gap-2">
                  {portfolio.tag?.map((tag, index) => (
                    <Badge key={index}>{tag}</Badge>
                  ))}
                </div>
                <span className="my-4 text-slate-700">
                  {portfolio.description}
                </span>
                <div className="my-5 flex gap-4">
                  {portfolio.url && (
                    <Link
                      href={portfolio.url}
                      className="hover:text-hprimary flex items-center gap-1 transition-all hover:underline"
                    >
                      <MoveRight /> Try It
                    </Link>
                  )}
                  {portfolio.githubUrl && (
                    <Link
                      href={portfolio.githubUrl}
                      className="hover:text-hprimary flex items-center gap-1 transition-all hover:underline"
                    >
                      <Github /> Github
                    </Link>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Contact Me */}
      <div id="contact" className="px-5 py-8">
        <div className="bg-hprimary-dark mx-auto flex max-w-5xl flex-col gap-3 rounded-xl p-4">
          <h3 className="text-hprimary-light text-lg font-bold">Contact me</h3>
          <h1 className="text-2xl font-bold text-white">
            Ready to get started?
          </h1>
          <p className="text-white">
            Feel free to contact me, let’s discuss about your vision!
          </p>
          <Link href={`mailto:${me?.email}`} className="ml-auto">
            <button className="flex w-full items-center gap-2 rounded-md bg-white px-3 py-2 md:w-auto">
              Send Me an Email <Send />
            </button>
          </Link>
        </div>
      </div>

      {/* Footer */}
      <footer className="flex justify-center bg-black p-5">
        <p className="text-white">
          Made with ❤ by Anjar Dwi Hariadi using NextJS.
        </p>
      </footer>
    </main>
  );
}
