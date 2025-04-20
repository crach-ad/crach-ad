import Link from "next/link"
import Image from "next/image"
import { ArrowLeft, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

export default function SpeakingEventsPage() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <div className="mb-8">
        <Link href="#" className="flex items-center text-muted-foreground hover:text-foreground transition-colors mb-2">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Link>
        <h1 className="text-4xl font-bold">Speaking Events</h1>
        <p className="text-xl text-muted-foreground mt-2">
          Sharing insights on STEM education, curriculum development, and policy advancements through keynotes and
          workshops.
        </p>
      </div>

      {/* First Event */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-16 border-b pb-16">
        <div className="md:col-span-1">
          <div className="bg-slate-900 rounded-lg overflow-hidden aspect-square flex items-center justify-center">
            <Image
              src="/images/edvolutionpic.jpg"
              alt="EdVolution Symposium at Ohio State University"
              width={400}
              height={400}
              className="object-cover"
            />
          </div>
        </div>

        <div className="md:col-span-3">
          <div className="mb-2">
            <h2 className="text-2xl font-bold">EdVolution Symposium</h2>
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
            The EdVolution Symposium at Ohio State University was a powerful event focused on professional development
            and meaningful connections. In a room filled with K-12 educators, state department officials, and other key
            stakeholders, I shared insights from my work in STEM education, covering curriculum development, pedagogy,
            community engagement, and policy advancements in The Bahamas.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <div className="border rounded-lg p-4">
              <div className="flex items-start">
                <div className="bg-slate-100 p-2 rounded-md mr-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-slate-700"
                  >
                    <path d="M18 20V6a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v14"></path>
                    <path d="M2 20h20"></path>
                    <path d="M14 12v.01"></path>
                  </svg>
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
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-slate-700"
                  >
                    <circle cx="12" cy="12" r="10"></circle>
                    <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path>
                    <path d="M12 17h.01"></path>
                  </svg>
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
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-slate-700"
                  >
                    <path d="M12 20h9"></path>
                    <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path>
                  </svg>
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
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-slate-700"
                  >
                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                    <circle cx="9" cy="7" r="4"></circle>
                    <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                    <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                  </svg>
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


        </div>
      </div>

      {/* Second Event (HEALinc Summit) */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-16 border-b pb-16">
        <div className="md:col-span-1">
          <div className="bg-slate-900 rounded-lg overflow-hidden aspect-square flex items-center justify-center">
            <Image
              src="/images/healinc-future-health-summit.jpg"
              alt="HEALinc Future Health Innovation Summit"
              width={400}
              height={400}
              className="object-cover"
            />
          </div>
        </div>

        <div className="md:col-span-3">
          <div className="mb-2">
            <h2 className="text-2xl font-bold">HEALinc Summit - Bridge The Future Program</h2>
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
            HEALinc 360's Bridge The Future program is designed to provide the necessary network, resources, exposure
            and training for young people to be competitive in emerging STEM spaces. We aim to create an inclusive space
            that lives in both our physical and virtual environments - dedicated to bridging the gap between education
            and industry in STEM fields.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <div className="border rounded-lg p-4">
              <div className="flex items-start">
                <div className="bg-slate-100 p-2 rounded-md mr-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-slate-700"
                  >
                    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                    <circle cx="9" cy="7" r="4" />
                    <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                  </svg>
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
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-slate-700"
                  >
                    <path d="M21 12V7H5v14h11" />
                    <line x1="9" y1="15" x2="9" y2="15" />
                    <line x1="9" y1="11" x2="9" y2="11" />
                    <line x1="13" y1="15" x2="13" y2="15" />
                    <line x1="13" y1="11" x2="13" y2="11" />
                    <line x1="17" y1="11" x2="17" y2="11" />
                    <path d="M21 18a3 3 0 1 0-3 3 2.97 2.97 0 0 0 3-3z" />
                  </svg>
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
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-slate-700"
                  >
                    <path d="M16 16v4a2 2 0 0 1-2 2h-4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v4" />
                    <rect width="8" height="8" x="8" y="8" rx="1" />
                  </svg>
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
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-slate-700"
                  >
                    <path d="M12 2v8" />
                    <path d="m4.93 10.93 1.41 1.41" />
                    <path d="M2 18h2" />
                    <path d="M20 18h2" />
                    <path d="m19.07 10.93-1.41 1.41" />
                    <path d="M22 22H2" />
                    <path d="m8 22 4-10 4 10" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-semibold text-sm">Venue</h4>
                  <p className="text-muted-foreground text-sm">Physical event at Bahamar resort in 2019</p>
                </div>
              </div>
            </div>
          </div>


        </div>
      </div>

      {/* Third Event (Bahamas Business Outlook 2020) */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-16 border-b pb-16">
        <div className="md:col-span-1">
          <div className="bg-slate-900 rounded-lg overflow-hidden aspect-square flex items-center justify-center">
            <Image
              src="/images/businessoutlook.png"
              alt="29th Annual Bahamas Business Outlook 2020"
              width={400}
              height={400}
              className="object-cover"
            />
          </div>
        </div>

        <div className="md:col-span-3">
          <div className="mb-2">
            <h2 className="text-2xl font-bold">29th Annual Bahamas Business Outlook</h2>
          </div>

          <p className="text-muted-foreground mb-4">
            A New Era: "Resilience in the Face of Vulnerability" - Discussion on AI's impact on Education
          </p>

          <div className="flex flex-wrap gap-2 mb-4">
            <Badge variant="secondary">Artificial Intelligence</Badge>
            <Badge variant="secondary">Education</Badge>
            <Badge variant="secondary">Industry Disruption</Badge>
            <Badge variant="secondary">The Bahamas</Badge>
            <Badge variant="secondary">Baha Mar Resort</Badge>
          </div>

          <h3 className="text-lg font-semibold mb-2">Event Overview</h3>

          <p className="mb-4">
            At the 29th Annual Bahamas Business Outlook held at Baha Mar Resort on January 16, 2020, I presented on the topic "How Is Artificial Intelligence (AI) Disrupting Industry? - Education." As the Head of Math and Sciences Department at Windsor School, I shared insights on AI's transformative impact on educational practices and systems in The Bahamas and beyond.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <div className="border rounded-lg p-4">
              <div className="flex items-start">
                <div className="bg-slate-100 p-2 rounded-md mr-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-slate-700"
                  >
                    <path d="M18 20V6a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v14"></path>
                    <path d="M2 20h20"></path>
                    <path d="M14 12v.01"></path>
                  </svg>
                </div>
                <div>
                  <h4 className="font-semibold text-sm">Presentation Focus</h4>
                  <p className="text-muted-foreground text-sm">
                    AI's disruptive impact on educational systems and practices
                  </p>
                </div>
              </div>
            </div>

            <div className="border rounded-lg p-4">
              <div className="flex items-start">
                <div className="bg-slate-100 p-2 rounded-md mr-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-slate-700"
                  >
                    <circle cx="12" cy="12" r="10"></circle>
                    <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path>
                    <path d="M12 17h.01"></path>
                  </svg>
                </div>
                <div>
                  <h4 className="font-semibold text-sm">Audience Engagement</h4>
                  <p className="text-muted-foreground text-sm">
                    Interactive discussion with business leaders and education stakeholders
                  </p>
                </div>
              </div>
            </div>

            <div className="border rounded-lg p-4">
              <div className="flex items-start">
                <div className="bg-slate-100 p-2 rounded-md mr-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-slate-700"
                  >
                    <path d="M12 20h9"></path>
                    <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path>
                  </svg>
                </div>
                <div>
                  <h4 className="font-semibold text-sm">Innovation Insights</h4>
                  <p className="text-muted-foreground text-sm">
                    Explored innovative approaches to integrating AI in education
                  </p>
                </div>
              </div>
            </div>

            <div className="border rounded-lg p-4">
              <div className="flex items-start">
                <div className="bg-slate-100 p-2 rounded-md mr-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-slate-700"
                  >
                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                    <circle cx="9" cy="7" r="4"></circle>
                    <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                    <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                  </svg>
                </div>
                <div>
                  <h4 className="font-semibold text-sm">Venue & Date</h4>
                  <p className="text-muted-foreground text-sm">
                    Baha Mar Resort, January 16, 2020
                  </p>
                </div>
              </div>
            </div>
          </div>


        </div>
      </div>

      {/* More Events Coming Soon */}
      <div className="text-center py-8">
        <h3 className="text-xl font-semibold">More Speaking Events Coming Soon</h3>
      </div>
    </div>
  )
}
