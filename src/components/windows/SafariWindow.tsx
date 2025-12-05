import { WindowWrapper } from '@/components/desktop/WindowWrapper';
import { ExternalLink, Calendar } from 'lucide-react';

interface BlogPost {
  id: string;
  title: string;
  date: string;
  excerpt: string;
  url: string;
}

const blogPosts: BlogPost[] = [
  {
    id: '1',
    title: 'Building Scalable React Applications',
    date: '2024-01-15',
    excerpt: 'Learn the best practices for building large-scale React applications that are maintainable and performant.',
    url: '#',
  },
  {
    id: '2',
    title: 'The Future of Web Development',
    date: '2024-01-08',
    excerpt: 'Exploring emerging technologies and trends that will shape the future of web development.',
    url: '#',
  },
  {
    id: '3',
    title: 'Mastering TypeScript',
    date: '2023-12-20',
    excerpt: 'A comprehensive guide to TypeScript features that will level up your development skills.',
    url: '#',
  },
  {
    id: '4',
    title: 'Design Systems in Practice',
    date: '2023-12-10',
    excerpt: 'How to build and maintain a design system that scales with your organization.',
    url: '#',
  },
];

export const SafariWindow = () => {
  return (
    <WindowWrapper id="safari" title="Blog — Safari" width={750} height={550}>
      <div className="h-full bg-card flex flex-col">
        {/* URL Bar */}
        <div className="h-10 px-4 flex items-center gap-3 bg-secondary/30 border-b border-border">
          <div className="flex-1 h-7 px-3 rounded-md bg-muted flex items-center">
            <span className="text-xs text-muted-foreground truncate">
              https://johndoe.dev/blog
            </span>
          </div>
        </div>

        {/* Blog Content */}
        <div className="flex-1 p-6 overflow-auto">
          <div className="max-w-2xl mx-auto">
            <h1 className="text-2xl font-bold text-foreground mb-2">Developer Blog</h1>
            <p className="text-muted-foreground mb-8">
              Thoughts on code, design, and building great products.
            </p>

            <div className="space-y-6">
              {blogPosts.map((post) => (
                <article
                  key={post.id}
                  className="p-5 rounded-xl bg-secondary/30 hover:bg-secondary/50 transition-colors group"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <h2 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors mb-2">
                        {post.title}
                      </h2>
                      <p className="text-sm text-foreground/70 mb-3 line-clamp-2">
                        {post.excerpt}
                      </p>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <Calendar className="w-3 h-3" />
                        <span>{new Date(post.date).toLocaleDateString('en-US', { 
                          year: 'numeric', 
                          month: 'long', 
                          day: 'numeric' 
                        })}</span>
                      </div>
                    </div>
                    <a
                      href={post.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-lg bg-primary/10 text-primary hover:bg-primary/20 transition-colors"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </div>
    </WindowWrapper>
  );
};
