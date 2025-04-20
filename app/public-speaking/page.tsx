import Image from "next/image";

export default function PublicSpeakingPage() {
  return (
    <div className="container px-4 py-12 md:px-6 md:py-24">
      <header className="mb-12 text-center">
        <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl mb-4">Public Speaking Events</h1>
        <p className="max-w-2xl mx-auto text-muted-foreground md:text-xl mb-6">
          Sharing insights and expertise at conferences, schools, and community events. Explore recent highlights below.
        </p>
      </header>
      <section className="mb-16">
        <div className="grid gap-8 md:grid-cols-2">
          <div className="flex flex-col items-center justify-center">
            <Image
              src="/images/osu-edvolution-keynote.jpg"
              alt="Keynote at The Ohio State University EdVolution Symposium"
              width={500}
              height={350}
              className="rounded-lg mb-4 shadow-lg"
            />
            <div className="text-center">
              <h2 className="text-xl font-semibold mb-2">Keynote Speaker – EdVolution Symposium</h2>
              <p className="text-sm text-muted-foreground mb-2">
                The Ohio State University College of Education and Human Ecology
              </p>
              <p className="text-sm text-muted-foreground mb-2">
                Focus: Professional development, meaningful connections, and advancing STEM education in The Bahamas.
              </p>
              <p className="text-sm text-muted-foreground mb-2">
                Shared insights on curriculum development, pedagogy, community engagement, and policy advancements.
              </p>
              <p className="text-xs text-muted-foreground">
                Special thanks to Detra M. Price and the Center for Digital Learning and Innovation for hosting.
              </p>
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <Image
              src="/images/osu-edvolution-keynote-panel.jpg"
              alt="Panel with educators at EdVolution Symposium"
              width={500}
              height={350}
              className="rounded-lg shadow"
            />
            <Image
              src="/images/osu-edvolution-keynote-speaking.jpg"
              alt="Speaking at the podium, EdVolution Symposium"
              width={500}
              height={350}
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function PublicSpeakingPage() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <div className="mb-8">
        <Link href="/" className="flex items-center text-muted-foreground hover:text-foreground transition-colors mb-2">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Link>
        <h1 className="text-4xl font-bold">Speaking Events</h1>
        <p className="text-xl text-muted-foreground mt-2">
          Sharing insights on STEM education, curriculum development, and policy advancements through keynotes and workshops.
        </p>
      </div>
      {/* First Event */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-16 border-b pb-16">
        <div className="md:col-span-1">
          <div className="bg-slate-900 rounded-lg overflow-hidden aspect-square flex items-center justify-center">
            <Image
              src="/edvolution-symposium.jpeg"
              alt="EdVolution Symposium at Ohio State University"
              width={400}
              height={400}
              className="object-cover"
            />
          </div>
        </div>
        <div className="md:col-span-3">
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-2">
            <h2 className="text-2xl font-bold">EdVolution Symposium</h2>
            <Button variant="outline" size="sm" className="flex items-center gap-2 mt-2 md:mt-0">
              <ExternalLink className="h-4 w-4" />
              Event Website
            </Button>
          </div>
          <p className="text-muted-foreground mb-4">
            A professional development event for K-12 educators, state department officials, and education stakeholders
          </p>
          <div className="flex flex-wrap gap-2 mb-4">
            <Badge variant="secondary">STEM Education</Badge>
            <Badge variant="secondary">Curriculum Development</Badge>
            <Badge variant="secondary">Pedagogy</Badge>
            <Badge variant="secondary">Policy</Badge>
            <Badge variant="secondary">The Bahamas</Badge>
          </div>
          <h3 className="text-lg font-semibold mb-2">Event Overview</h3>
          <p className="mb-4">
            The EdVolution Symposium at Ohio State University was a powerful event focused on professional development and meaningful connections. In a room filled with K-12 educators, state department officials, and other key stakeholders, I shared insights from my work in STEM education, covering curriculum development, pedagogy, community engagement, and policy advancements in The Bahamas.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <div className="border rounded-lg p-4">
              <div className="flex items-start">
                <div className="bg-slate-100 p-2 rounded-md mr-3">
                  {/* Icon SVG */}
                </div>
                <div>
                  <h4 className="font-semibold text-sm">Presentation Focus</h4>
                  <p className="text-muted-foreground text-sm">
                    Shared insights on curriculum development and STEM education strategies
                  </p>
                </div>
              </div>
            </div>
            <div className="border rounded-lg p-4">
              <div className="flex items-start">
                <div className="bg-slate-100 p-2 rounded-md mr-3">
                  {/* Icon SVG */}
                </div>
                <div>
                  <h4 className="font-semibold text-sm">Audience Engagement</h4>
                  <p className="text-muted-foreground text-sm">
                    Interactive session with K-12 educators and department officials
                  </p>
                </div>
              </div>
            </div>
            <div className="border rounded-lg p-4">
              <div className="flex items-start">
                <div className="bg-slate-100 p-2 rounded-md mr-3">
                  {/* Icon SVG */}
                </div>
                <div>
                  <h4 className="font-semibold text-sm">Policy Insights</h4>
                  <p className="text-muted-foreground text-sm">
                    Discussed educational policy advancements in The Bahamas
                  </p>
                </div>
              </div>
            </div>
            <div className="border rounded-lg p-4">
              <div className="flex items-start">
                <div className="bg-slate-100 p-2 rounded-md mr-3">
                  {/* Icon SVG */}
                </div>
                <div>
                  <h4 className="font-semibold text-sm">Community Impact</h4>
                  <p className="text-muted-foreground text-sm">
                    Explored strategies for meaningful community engagement
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="flex gap-4 mt-4">
            <Button size="sm" variant="outline" className="flex items-center gap-2">
              View Details
              {/* Arrow SVG */}
            </Button>
            <Button size="sm" variant="outline" className="flex items-center gap-2">
              {/* Download SVG */}
              Download Slides
            </Button>
          </div>
        </div>
      </div>
      {/* Second Event (HEALinc Summit) */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-16 border-b pb-16">
        <div className="md:col-span-1">
          <div className="bg-slate-900 rounded-lg overflow-hidden aspect-square flex items-center justify-center">
            <Image
              src="/healinc-summit.jpeg"
              alt="HEALinc Summit - Bridge The Future Program"
              width={400}
              height={400}
              className="object-cover"
            />
          </div>
        </div>
        <div className="md:col-span-3">
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-2">
            <h2 className="text-2xl font-bold">HEALinc Summit - Bridge The Future Program</h2>
            <Button variant="outline" size="sm" className="flex items-center gap-2 mt-2 md:mt-0">
              <ExternalLink className="h-4 w-4" />
              Event Website
            </Button>
          </div>
          <p className="text-muted-foreground mb-4">
            A program designed to bridge the gap between education and industry in STEM fields
          </p>
          <div className="flex flex-wrap gap-2 mb-4">
            <Badge variant="secondary">Innovation</Badge>
            <Badge variant="secondary">STEM Education</Badge>
            <Badge variant="secondary">Health</Badge>
            <Badge variant="secondary">The Bahamas</Badge>
            <Badge variant="secondary">Bahamar Resort</Badge>
          </div>
          <h3 className="text-lg font-semibold mb-2">Event Overview</h3>
          <p className="mb-4">
            HEALinc 360's Bridge The Future program is designed to provide the necessary network, resources, exposure and training for young people to be competitive in emerging STEM spaces. We aim to create an inclusive space that lives in both our physical and virtual environments - dedicated to bridging the gap between education and industry in STEM fields.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <div className="border rounded-lg p-4">
              <div className="flex items-start">
                <div className="bg-slate-100 p-2 rounded-md mr-3">
                  {/* Icon SVG */}
                </div>
                <div>
                  <h4 className="font-semibold text-sm">Youth Development</h4>
                  <p className="text-muted-foreground text-sm">
                    Training young people to be competitive in emerging STEM fields
                  </p>
                </div>
              </div>
            </div>
            <div className="border rounded-lg p-4">
              <div className="flex items-start">
                <div className="bg-slate-100 p-2 rounded-md mr-3">
                  {/* Icon SVG */}
                </div>
                <div>
                  <h4 className="font-semibold text-sm">Hybrid Environment</h4>
                  <p className="text-muted-foreground text-sm">
                    Creating inclusive spaces in both physical and virtual environments
                  </p>
                </div>
              </div>
            </div>
            <div className="border rounded-lg p-4">
              <div className="flex items-start">
                <div className="bg-slate-100 p-2 rounded-md mr-3">
                  {/* Icon SVG */}
                </div>
                <div>
                  <h4 className="font-semibold text-sm">Industry Connections</h4>
                  <p className="text-muted-foreground text-sm">Bridging the gap between education and industry</p>
                </div>
              </div>
            </div>
            <div className="border rounded-lg p-4">
              <div className="flex items-start">
                <div className="bg-slate-100 p-2 rounded-md mr-3">
                  {/* Icon SVG */}
                </div>
                <div>
                  <h4 className="font-semibold text-sm">Venue</h4>
                  <p className="text-muted-foreground text-sm">Physical event at Bahamar resort in 2019</p>
                </div>
              </div>
            </div>
          </div>
          <div className="flex gap-4 mt-4">
            <Button size="sm" variant="outline" className="flex items-center gap-2">
              View Details
              {/* Arrow SVG */}
            </Button>
            <Button size="sm" variant="outline" className="flex items-center gap-2">
              {/* Download SVG */}
              Download Slides
            </Button>
          </div>
        </div>
      </div>
      {/* More Events Coming Soon */}
      <div className="text-center py-8">
        <h3 className="text-xl font-semibold">More Speaking Events Coming Soon</h3>
      </div>
    </div>
  );
}
