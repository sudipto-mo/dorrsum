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
  "cursor-pointer text-white transition-colors hover:text-blue-400 font-medium inline-flex items-center group bg-transparent border-0 p-0";

export default function TeaserNav(props: TeaserNavProps) {
  const {
    description = "Explore the network. Deeper models, covenants, and full briefs are available to clients.",
    loginHref = "/login",
    className = "",
  } = props;

  const loginBlock = (
    <div className="text-sm text-slate-500">
      Full institutional research —{" "}
      <Link href={loginHref} className="ml-1 text-blue-500 hover:underline">
        client login
      </Link>
    </div>
  );

  if ("terminal" in props && props.terminal) {
    return (
      <div className={`border-t border-slate-800 pt-6 ${className}`}>
        <p className="mb-6 max-w-2xl text-sm text-slate-400">{description}</p>
        <div className="flex flex-col gap-4 border-t border-slate-800/50 pt-4 md:flex-row md:items-center md:justify-end">
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
    <div className={`border-t border-slate-800 pt-6 ${className}`}>
      <p className="mb-6 max-w-2xl text-sm text-slate-400">{description}</p>

      <div className="flex flex-col justify-between gap-4 border-t border-slate-800/50 pt-4 md:flex-row md:items-center">
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
