import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Mountain,
  Github,
  Calendar,
  Code,
  Link as LinkIcon,
  LinkedinIcon,
} from "lucide-react";
import authors from "@/data/authors.json";

export const metadata = {
  title: "Authors & Contributors - TWall Beta",
  description: "Meet the people who built and maintain TWall Beta",
};

export default function AuthorsPage() {
  return (
    <div className="min-h-screen bg-linear-to-br from-trinity-blue-50 via-white to-trinity-silver-50">
      {/* Navigation */}
      <nav className="border-b border-trinity-silver-200 bg-white/80 backdrop-blur-sm shadow-sm sticky top-0 z-50">
        <div className="container mx-auto flex items-center justify-between px-4 py-4">
          <Link
            href="/"
            className="flex items-center gap-2 text-2xl font-bold text-trinity-blue-600"
          >
            <Mountain className="h-7 w-7" />
            TWall Beta
          </Link>

          <div className="flex items-center gap-4">
            <Link href="/climbs">
              <Button variant="ghost" className="text-trinity-silver-700">
                Browse Climbs
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      <main className="container mx-auto px-4 py-12 max-w-4xl">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-trinity-blue-600 mb-2">
            Authors & Contributors
          </h1>
          <p className="text-trinity-silver-600">
            This project is open source and maintained by climbers, for
            climbers.
          </p>
        </div>

        {/* How to Contribute */}
        <div className="bg-white rounded-xl shadow-lg border border-trinity-blue-100 p-6 mb-8">
          <h2 className="text-2xl font-bold text-trinity-blue-600 mb-4">
            Want to Contribute?
          </h2>
          <div className="space-y-4 text-trinity-silver-700">
            <p>
              TWall Beta is open source! If you&apos;d like to contribute,
              here&apos;s how to add yourself to this page:
            </p>
            <ol className="list-decimal list-inside space-y-2 ml-4">
              <li>Fork the repository on GitHub</li>
              <li>
                Edit{" "}
                <code className="bg-trinity-silver-100 px-2 py-1 rounded text-sm">
                  src/data/authors.json
                </code>
              </li>
              <li>Add your entry following the existing format</li>
              <li>Submit a pull request</li>
            </ol>
            <div className="bg-trinity-blue-50 border border-trinity-blue-200 rounded p-4 mt-4">
              <p className="text-sm font-mono text-trinity-silver-700">
                {"{"}
                <br />
                &nbsp;&nbsp;&quot;name&quot;: &quot;Your Name&quot;,
                <br />
                &nbsp;&nbsp;&quot;role&quot;: &quot;Contributor&quot;,
                <br />
                &nbsp;&nbsp;&quot;github&quot;:
                &quot;your-github-username&quot;,
                <br />
                &nbsp;&nbsp;&quot;contributions&quot;: [&quot;What you worked
                on&quot;],
                <br />
                &nbsp;&nbsp;&quot;joinedDate&quot;: &quot;YYYY-MM&quot;
                <br />
                {"}"}
              </p>
            </div>
          </div>
        </div>

        {/* Authors Grid */}
        <div className="grid gap-6 md:grid-cols-2">
          {authors.map((author, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-lg border border-trinity-blue-100 p-6"
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-xl font-bold text-trinity-blue-600">
                    {author.name}
                  </h3>
                  <p className="text-sm text-trinity-silver-600">
                    {author.role}
                  </p>
                </div>
                <div className="flex items-start justify-between">
                  {author.github && (
                    <a
                      href={`https://github.com/${author.github}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-1 text-trinity-silver-600 hover:text-trinity-blue-600 transition-colors"
                    >
                      <Github className="h-5 w-5" />
                    </a>
                  )}
                  {author.website && (
                    <a
                      href={author.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-1 text-trinity-silver-600 hover:text-trinity-blue-600 transition-colors"
                    >
                      <LinkIcon className="h-5 w-5" />
                    </a>
                  )}
                  {author.linkedIn && (
                    <a
                      href={author.linkedIn}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-1   text-trinity-silver-600 hover:text-trinity-blue-600 transition-colors"
                    >
                      <LinkedinIcon className="h-5 w-5" />
                    </a>
                  )}
                </div>
              </div>

              {author.contributions && author.contributions.length > 0 && (
                <div className="mb-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Code className="h-4 w-4 text-trinity-blue-600" />
                    <p className="text-sm font-semibold text-trinity-silver-700">
                      Contributions:
                    </p>
                  </div>
                  <ul className="space-y-1">
                    {author.contributions.map((contribution, i) => (
                      <li
                        key={i}
                        className="text-sm text-trinity-silver-600 ml-6"
                      >
                        • {contribution}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="flex items-center gap-1 text-xs text-trinity-silver-400">
                <Calendar className="h-3 w-3" />
                {author.joinedDate}
              </div>
            </div>
          ))}
        </div>

        {/* GitHub Link */}
        <div className="mt-8 text-center">
          <a
            href="https://github.com/RobbyLinson/twall-beta"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-trinity-blue-600 hover:text-trinity-blue-700 font-semibold"
          >
            <Github className="h-5 w-5" />
            View on GitHub
          </a>
        </div>
      </main>
    </div>
  );
}
