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
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

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
      <div id="home" className="bg-sidebar grid min-h-screen px-4 py-16">
        <div className="mx-auto flex max-w-5xl flex-col-reverse items-center gap-8 md:flex-row">
          <div className="flex flex-[3] flex-col gap-4">
            <h1 className="text-4xl font-bold">
              <span className="text-primary">Congratulation!</span> 🙌, you have
              come to the right place!
            </h1>
            <span className="mb-5 text-lg">
              Hello, my name is
              <span className="font-bold"> Anjar Dwi Hariadi</span>.
              {me?.greeting}
            </span>
            <Link
              href={"#contact"}
              className={cn(buttonVariants({ size: "lg" }), "w-fit")}
            >
              Get Started
              <MoveRight />
            </Link>
            <div className="mt-4 flex gap-6">
              {myAccount.map((account, index) => (
                <Link
                  href={account.href}
                  key={index}
                  className="hover:text-secondary/50 text-secondary transition-colors"
                >
                  {account.icon}
                </Link>
              ))}
            </div>
          </div>

          <div className="flex-[2]">
            <div className="bg-primary absolute mx-8 my-4 rounded-t-full rounded-l-full p-3">
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
      <div className="bg-destructive/10 px-5 py-8">
        <div className="mx-auto flex max-w-5xl items-center justify-center gap-5">
          <span>
            <b className="text-destructive">NEW:</b> Now I am on Youtube
          </span>
          <Link
            href={"https://www.youtube.com/@an.alphaleonis"}
            className={buttonVariants({ size: "lg", variant: "destructive" })}
          >
            <Youtube /> Visit My Channel
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
            <span className="text-primary text-lg font-bold">About Me</span>
            <h1 className="text-4xl font-bold">{me?.descTitle}</h1>
            <p className="text-muted-foreground mb-3">{me?.descContent}</p>
            <Link
              href={`${me?.resume}`}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                buttonVariants({ size: "lg", variant: "link" }),
                "w-fit",
              )}
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
      <div id="experience" className="bg-sidebar px-5 py-8">
        <div className="mx-auto flex max-w-2xl flex-col items-center gap-5">
          <span className="text-primary text-lg font-bold">Experience</span>
          {experiences.map((experience, index) => (
            <div
              key={index}
              className="bg-background w-full rounded-xl px-5 py-3"
            >
              <h2 className="mb-2 font-bold">{experience.company}</h2>
              <h4 className="mb-2">{experience.title}</h4>
              <span className="text-muted-foreground text-sm font-light">
                {experience.period}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* My portfolio */}
      <div id="portfolio" className="bg-sidebar px-5 py-8">
        <div className="mx-auto flex max-w-5xl flex-col items-center gap-5">
          <span className="text-primary text-lg font-bold">Portfolio</span>
          <h1 className="text-4xl font-bold">
            Enjoying every process and here’s the results
          </h1>
          <div className="grid grid-cols-[repeat(auto-fill,minmax(384px,1fr))] gap-3 py-2">
            {portfolios.map((portfolio) => (
              <Card
                key={portfolio.id}
                className="hover:border-primary transition-all hover:shadow-2xl"
              >
                <CardHeader>
                  <Image
                    src={portfolio.image ?? "/no-image.webp"}
                    alt={portfolio.title}
                    width={200}
                    height={200}
                    className="aspect-video w-full rounded-md object-cover"
                  />
                  <CardTitle>{portfolio.title}</CardTitle>
                  <div className="flex flex-wrap gap-2">
                    {portfolio.tag.map((tag, index) => (
                      <Badge key={index} variant="secondary">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription>{portfolio.description}</CardDescription>
                </CardContent>
                <CardFooter className="gap-2">
                  <Link
                    href={portfolio.url ?? "#"}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={buttonVariants({
                      size: "sm",
                      variant: "outline",
                    })}
                  >
                    <MoveRight /> Try It
                  </Link>
                  <Link
                    href={portfolio.githubUrl ?? "#"}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={buttonVariants({
                      size: "sm",
                      variant: "outline",
                    })}
                  >
                    <Github /> Github
                  </Link>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Contact Me */}
      <div id="contact" className="px-5 py-8">
        <div className="bg-chart-5 mx-auto flex max-w-5xl flex-col gap-3 rounded-xl p-4">
          <h3 className="text-primary text-lg font-bold">Contact me</h3>
          <h1 className="text-2xl font-bold text-white">
            Ready to get started?
          </h1>
          <p className="text-white">
            Feel free to contact me, let’s discuss about your vision!
          </p>
          <Link
            href={`mailto:${me?.email}`}
            className={cn(
              buttonVariants({ size: "lg", variant: "secondary" }),
              "bg-primary ml-auto text-white",
            )}
          >
            Send Me an Email <Send />
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
