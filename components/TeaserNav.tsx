import Link from "next/link";

type Base = {
  description?: string;
  loginHref?: string;
  className?: string;
};

/** Last teaser in the sequence — description + client login only */
export type TeaserNavTerminalProps = Base & { terminal: true };

export type TeaserNavWithNextProps = Base & {
  terminal?: false;
} & (
  | {
      nextLabel: string;
      nextHref: string;
      onNextClick?: undefined;
    }
  | {
      nextLabel: string;
      nextHref?: undefined;
      onNextClick: () => void;
    }
);

export type TeaserNavProps = TeaserNavTerminalProps | TeaserNavWithNextProps;

const nextClassName =
  "inline-flex items-center gap-1 bg-transparent p-0 text-[var(--pa-navy)] transition-colors hover:text-[var(--pa-navy-deep)] font-semibold border-0 cursor-pointer group";

/** Default: after login, land on the AI infrastructure network map (same-origin path). */
const DEFAULT_LOGIN_HREF = "/login?returnTo=" + encodeURIComponent("/dc-network-map.html");

export default function TeaserNav(props: TeaserNavProps) {
  const {
    description = "Explore the network. Deeper models, covenants, and full briefs are available to clients.",
    loginHref = DEFAULT_LOGIN_HREF,
    className = "",
  } = props;

  const loginBlock = (
    <div className="text-sm text-[var(--pa-muted)]">
      Full institutional research —{" "}
      <Link href={loginHref} className="ml-1 text-[var(--pa-link)] hover:underline">
        client login
      </Link>
    </div>
  );

  if ("terminal" in props && props.terminal) {
    return (
      <div className={`border-t border-[color:var(--pa-border)] pt-6 ${className}`}>
        <p className="mb-6 max-w-2xl text-sm text-[var(--pa-muted)]">{description}</p>
        <div className="flex flex-col gap-4 border-t border-[color:var(--pa-border)] pt-4 md:flex-row md:items-center md:justify-end">
          {loginBlock}
        </div>
      </div>
    );
  }

  const { nextLabel, nextHref, onNextClick } = props;

  const nextContent = (
    <>
      Next: {nextLabel}
      <span className="ml-2 transition-transform group-hover:translate-x-1" aria-hidden>
        →
      </span>
    </>
  );

  return (
    <div className={`border-t border-[color:var(--pa-border)] pt-6 ${className}`}>
      <p className="mb-6 max-w-2xl text-sm text-[var(--pa-muted)]">{description}</p>

      <div className="flex flex-col justify-between gap-4 border-t border-[color:var(--pa-border)] pt-4 md:flex-row md:items-center">
        {onNextClick ? (
          <button type="button" onClick={onNextClick} className={`${nextClassName} text-left`}>
            {nextContent}
          </button>
        ) : (
          <Link href={nextHref!} className={nextClassName}>
            {nextContent}
          </Link>
        )}

        {loginBlock}
      </div>
    </div>
  );
}
