import type { ReactNode } from "react";

type SocialKey =
  | "facebook"
  | "instagram"
  | "tiktok"
  | "youtube"
  | "pinterest"
  | "x"
  | "linkedin"
  | "reddit";

type Props = {
  socialFacebook?: string | null;
  socialInstagram?: string | null;
  socialTwitter?: string | null;
  socialLinkedin?: string | null;
  socialWhatsapp?: string | null;
  socialTiktok?: string | null;
  socialYoutube?: string | null;
  socialPinterest?: string | null;
  socialReddit?: string | null;
};

type Network = {
  key: SocialKey;
  label: string;
  href: string | null;
  bg: string;
  icon: ReactNode;
};

function isHttp(url: string | null | undefined): url is string {
  return Boolean(url && /^https?:\/\//i.test(url));
}

/** All brand logos — only linked accounts are highlighted + clickable. */
export function AuthorSocialLinks(props: Props) {
  const tiktok = props.socialTiktok || props.socialWhatsapp || null;

  const networks: Network[] = [
    {
      key: "facebook",
      label: "Facebook",
      href: isHttp(props.socialFacebook) ? props.socialFacebook : null,
      bg: "bg-[#1877F2]",
      icon: <FacebookIcon />,
    },
    {
      key: "instagram",
      label: "Instagram",
      href: isHttp(props.socialInstagram) ? props.socialInstagram : null,
      bg: "bg-gradient-to-br from-[#F58529] via-[#DD2A7B] to-[#8134AF]",
      icon: <InstagramIcon />,
    },
    {
      key: "tiktok",
      label: "TikTok",
      href: isHttp(tiktok) ? tiktok : null,
      bg: "bg-[#010101]",
      icon: <TikTokIcon />,
    },
    {
      key: "youtube",
      label: "YouTube",
      href: isHttp(props.socialYoutube) ? props.socialYoutube : null,
      bg: "bg-[#FF0000]",
      icon: <YouTubeIcon />,
    },
    {
      key: "pinterest",
      label: "Pinterest",
      href: isHttp(props.socialPinterest) ? props.socialPinterest : null,
      bg: "bg-[#E60023]",
      icon: <PinterestIcon />,
    },
    {
      key: "x",
      label: "X",
      href: isHttp(props.socialTwitter) ? props.socialTwitter : null,
      bg: "bg-[#111111]",
      icon: <XIcon />,
    },
    {
      key: "linkedin",
      label: "LinkedIn",
      href: isHttp(props.socialLinkedin) ? props.socialLinkedin : null,
      bg: "bg-[#0A66C2]",
      icon: <LinkedInIcon />,
    },
    {
      key: "reddit",
      label: "Reddit",
      href: isHttp(props.socialReddit) ? props.socialReddit : null,
      bg: "bg-[#FF4500]",
      icon: <RedditIcon />,
    },
  ];

  return (
    <div>
      <p className="text-sm font-semibold text-ink">Follow the author</p>
      <p className="mt-1 text-xs text-forest-muted">
        Highlighted logos have a live link from the author&apos;s profile.
      </p>
      <ul className="mt-3 flex flex-wrap items-center gap-2.5">
        {networks.map((n) => {
          const active = Boolean(n.href);
          const className = `inline-flex h-11 w-11 items-center justify-center rounded-xl text-white shadow-soft transition ${
            n.bg
          } ${
            active
              ? "opacity-100 hover:scale-105 hover:brightness-110"
              : "cursor-default opacity-25 grayscale"
          }`;

          if (active && n.href) {
            return (
              <li key={n.key}>
                <a
                  href={n.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  title={n.label}
                  aria-label={n.label}
                  className={className}
                >
                  {n.icon}
                </a>
              </li>
            );
          }

          return (
            <li key={n.key}>
              <span
                title={`${n.label} (not linked)`}
                aria-label={`${n.label} not linked`}
                className={className}
              >
                {n.icon}
              </span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

function FacebookIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" aria-hidden>
      <path d="M14 8h3V5h-3c-2.2 0-4 1.8-4 4v2H7v3h3v7h3v-7h3l1-3h-4V9c0-.6.4-1 1-1z" />
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" aria-hidden>
      <rect x="3" y="3" width="18" height="18" rx="5" stroke="currentColor" strokeWidth="2" />
      <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="2" />
      <circle cx="17.5" cy="6.5" r="1.2" fill="currentColor" />
    </svg>
  );
}

function TikTokIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" aria-hidden>
      <path d="M16.5 3c.4 2.2 1.8 3.8 4 4.3v2.6c-1.5-.1-2.9-.6-4-1.4v6.4c0 3.3-2.6 5.9-5.9 5.9S4.7 18.2 4.7 14.9c0-3.2 2.5-5.8 5.6-5.9v2.7c-1.6.1-2.9 1.4-2.9 3.1 0 1.8 1.4 3.2 3.2 3.2s3.2-1.4 3.2-3.2V3h2.7z" />
    </svg>
  );
}

function YouTubeIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" aria-hidden>
      <path d="M21.6 7.2c-.2-.9-.9-1.6-1.8-1.8C18.1 5 12 5 12 5s-6.1 0-7.8.4c-.9.2-1.6.9-1.8 1.8C2 9 2 12 2 12s0 3 .4 4.8c.2.9.9 1.6 1.8 1.8C5.9 19 12 19 12 19s6.1 0 7.8-.4c.9-.2 1.6-.9 1.8-1.8.4-1.8.4-4.8.4-4.8s0-3-.4-4.8zM10 15.2V8.8l5.2 3.2L10 15.2z" />
    </svg>
  );
}

function PinterestIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" aria-hidden>
      <path d="M12 2C6.5 2 2 6.5 2 12c0 4.2 2.6 7.8 6.3 9.3-.1-.8-.2-2 0-2.9.2-.8 1.3-5.4 1.3-5.4s-.3-.7-.3-1.6c0-1.5.9-2.7 2-2.7.9 0 1.4.7 1.4 1.5 0 .9-.6 2.3-.9 3.5-.3 1.1.5 1.9 1.5 1.9 1.8 0 3.2-1.9 3.2-4.7 0-2.4-1.8-4.2-4.3-4.2-2.9 0-4.6 2.2-4.6 4.4 0 .9.3 1.8.8 2.3.1.1.1.2.1.3l-.3 1.2c0 .2-.2.2-.4.1-1.5-.7-2.4-2.9-2.4-4.6 0-3.8 2.7-7.2 7.9-7.2 4.1 0 7.3 3 7.3 6.9 0 4.1-2.6 7.5-6.2 7.5-1.2 0-2.4-.6-2.8-1.4l-.8 2.9c-.3 1.1-1.1 2.4-1.6 3.2 1.2.4 2.5.6 3.8.6 5.5 0 10-4.5 10-10S17.5 2 12 2z" />
    </svg>
  );
}

function XIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden>
      <path d="M18.9 2H22l-6.8 7.8L23 22h-6.5l-5.1-6.7L5.7 22H2.6l7.3-8.3L1 2h6.6l4.6 6.1L18.9 2zm-1.1 18h1.8L6.3 3.9H4.4L17.8 20z" />
    </svg>
  );
}

function LinkedInIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" aria-hidden>
      <path d="M6.5 9H3.6v11.5h2.9V9zM5 3.5C4 3.5 3.2 4.3 3.2 5.3S4 7.1 5 7.1s1.8-.8 1.8-1.8S6 3.5 5 3.5zM20.4 9c-1.5 0-2.5.7-3 1.4V9H14.5v11.5H17.4v-6.1c0-1.6.3-3.2 2.3-3.2s2 1.7 2 3.3v6H24v-6.6C24 11.1 22.7 9 20.4 9z" />
    </svg>
  );
}

function RedditIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" aria-hidden>
      <path d="M14.5 3.2 15.8 9c1.2.1 2.3.5 3.2 1.2.5-.4 1.2-.6 1.9-.6 1.7 0 3 1.3 3 3 0 1.3-.8 2.4-2 2.8.2.7.3 1.4.3 2.1 0 3.6-4.1 6.5-9.2 6.5S3.8 20.1 3.8 16.5c0-.7.1-1.4.3-2.1-1.2-.4-2-1.5-2-2.8 0-1.7 1.3-3 3-3 .7 0 1.4.2 1.9.6.9-.7 2-.1 3.2-1.2l1.3-5.8c.1-.4.5-.6.8-.5l2.9.7c.4.1.6.5.5.8-.1.4-.5.6-.8.5l-2.1-.5-1 4.5c1.2 0 2.3.3 3.3.8zm-7 10.3c-.7 0-1.3.6-1.3 1.3s.6 1.3 1.3 1.3 1.3-.6 1.3-1.3-.6-1.3-1.3-1.3zm7 0c-.7 0-1.3.6-1.3 1.3s.6 1.3 1.3 1.3 1.3-.6 1.3-1.3-.6-1.3-1.3-1.3zm-7.1 3.3c.7 1.1 2 1.8 3.6 1.8s2.9-.7 3.6-1.8c.1-.2 0-.4-.2-.5-.2-.1-.4 0-.5.2-.5.8-1.6 1.3-2.9 1.3s-2.4-.5-2.9-1.3c-.1-.2-.3-.3-.5-.2-.2.1-.3.3-.2.5z" />
    </svg>
  );
}
