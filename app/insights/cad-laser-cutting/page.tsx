import Link from "next/link"
import { ArrowLeft, Calendar, Share2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"

export default function CadLaserCuttingArticlePage() {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1">
        <article className="container max-w-3xl py-12 md:py-16 lg:py-24">
          <div className="flex flex-col items-start gap-4 mb-8">
            <Link href="/insights">
              <Button variant="ghost" size="sm" className="gap-1">
                <ArrowLeft className="h-4 w-4" />
                Back to Insights
              </Button>
            </Link>
            <div className="space-y-2">
              <div className="flex flex-wrap gap-2">
                <Badge variant="outline">Maker Education</Badge>
                <Badge variant="outline">CAD Design</Badge>
                <Badge variant="outline">Laser Cutting</Badge>
                <Badge variant="outline">Constructionism</Badge>
              </div>
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                From Screen to Object: Why CAD and Laser Cutting Belong at the Heart of Maker Education
              </h1>
              <div className="flex items-center gap-4 text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  <span>Published: 2026</span>
                </div>
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              <Button variant="outline" size="icon">
                <Share2 className="h-4 w-4" />
              </Button>
            </div>
            <Separator className="my-4" />
          </div>

          <div className="prose prose-slate max-w-none">
            <p>
              What I enjoy most about maker education is when students realize technology is not just something they
              consume, but something they can actively create with. Some of the strongest learning experiences I&rsquo;ve
              seen happen through CAD design and laser cutting because they naturally blend creativity, engineering,
              problem solving, and iterative thinking into one process.
            </p>

            <p>
              When students begin designing in CAD, they quickly discover that digital creation requires intentionality.
              Every measurement matters. Every line, constraint, and alignment decision impacts the final product.
              Students start thinking spatially and structurally. They begin understanding how ideas move from
              imagination into manufacturable objects. That transition from concept to physical product is where
              learning becomes tangible.
            </p>

            <p>
              Laser cutting adds another layer to that experience. Students move from sketching ideas and building
              prototypes digitally to physically manufacturing their work. They test tolerances, evaluate materials,
              redesign weak structures, and troubleshoot assembly problems in real time. A design that looks perfect on
              screen may fail during manufacturing, and that failure becomes part of the learning process rather than
              something to avoid.
            </p>

            <Separator className="my-8" />

            <h2 className="text-2xl font-bold mt-8 mb-4">Beyond Software and Machines</h2>

            <p>
              What makes this process so valuable is that students are not simply learning software or machine
              operation. They are learning systems thinking, iteration, design logic, and resilience. A joint that
              doesn&rsquo;t fit properly teaches precision. Burn marks on a design encourage material analysis and
              machine calibration. Structural weaknesses force students to rethink geometry and support systems. Those
              moments create authentic engineering and design experiences that cannot be replicated through passive
              instruction alone.
            </p>

            <Separator className="my-8" />

            <h2 className="text-2xl font-bold mt-8 mb-4">Rooted in Papert and Dewey</h2>

            <p>
              This connects heavily with the ideas of Seymour Papert, who argued that &ldquo;learning happens especially
              felicitously in a context where the learner is consciously engaged in constructing a public entity.&rdquo;
              CAD and laser cutting embody that idea because students are constantly building meaningful artifacts they
              can physically interact with, evaluate, and improve.
            </p>

            <p>
              The work also reflects the philosophy of John Dewey, who emphasized that &ldquo;education is not
              preparation for life, education is life itself.&rdquo; In maker-centered environments, students are not
              practicing theoretical skills detached from reality. They are actively designing, prototyping,
              manufacturing, collaborating, and solving problems in ways that mirror real-world creative and engineering
              workflows.
            </p>

            <Separator className="my-8" />

            <h2 className="text-2xl font-bold mt-8 mb-4">Room for Different Kinds of Makers</h2>

            <p>
              One student may focus heavily on artistic engraving and visual aesthetics. Another may become deeply
              invested in mechanical assemblies and precision tolerances. Both approaches are valuable because both
              require ownership, creativity, and persistence. Maker education works best when students have the freedom
              to experiment, fail, redesign, and discover solutions through direct interaction with tools and materials.
            </p>

            <Separator className="my-8" />

            <h2 className="text-2xl font-bold mt-8 mb-4">Reconnecting with the Physical</h2>

            <p>
              In an educational environment increasingly centered around screens, automation, and rapid consumption,
              there is still something deeply important about students creating physical objects from their own ideas.
              CAD and laser cutting reconnect learners with design thinking, craftsmanship, and creative agency.
            </p>

            <p className="font-medium mt-4">
              The machine itself is never the goal. The real value comes from the process of imagining, testing,
              refining, and bringing ideas into the physical world.
            </p>

            <Separator className="my-8" />

            <h2 className="text-2xl font-bold mt-8 mb-4">References</h2>

            <ul className="list-disc pl-6 space-y-3 my-4 text-sm">
              <li>
                Papert, S., &amp; Harel, I. (1991). Situating Constructionism. In I. Harel &amp; S. Papert (Eds.),{" "}
                <em>Constructionism</em> (pp. 1&ndash;11). Ablex Publishing.
              </li>
              <li>
                Dewey, J. (1897). My Pedagogic Creed. <em>The School Journal</em>, 54(3), 77&ndash;80.
              </li>
              <li>
                Dewey, J. (1938). <em>Experience and Education</em>. Kappa Delta Pi.
              </li>
              <li>
                Martinez, S. L., &amp; Stager, G. (2013). <em>Invent to Learn: Making, Tinkering, and Engineering in the
                Classroom</em>. Constructing Modern Knowledge Press.
              </li>
              <li>
                Blikstein, P. (2013). Digital Fabrication and &ldquo;Making&rdquo; in Education: The Democratization of
                Invention. In J. Walter-Herrmann &amp; C. B&uuml;ching (Eds.),{" "}
                <em>FabLabs: Of Machines, Makers and Inventors</em> (pp. 203&ndash;222). Transcript Verlag.
              </li>
              <li>
                Halverson, E. R., &amp; Sheridan, K. M. (2014). The Maker Movement in Education.{" "}
                <em>Harvard Educational Review</em>, 84(4), 495&ndash;504.
              </li>
            </ul>
          </div>
        </article>
      </main>
      <footer className="w-full border-t py-6">
        <div className="container flex flex-col items-center justify-between gap-4 md:flex-row">
          <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
            © {new Date().getFullYear()} CRACH.AD. All rights reserved.
          </p>
          <div className="flex gap-4">
            <Link href="https://twitter.com" className="text-sm font-medium hover:underline underline-offset-4">
              Twitter
            </Link>
            <Link href="https://github.com" className="text-sm font-medium hover:underline underline-offset-4">
              GitHub
            </Link>
            <Link href="https://linkedin.com" className="text-sm font-medium hover:underline underline-offset-4">
              LinkedIn
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
