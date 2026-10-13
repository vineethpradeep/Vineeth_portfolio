import { profile, statement } from "../content";
import { BookLink, CvButton, SplitReveal } from "../ui";

// Personal statement: a large quote with the two primary actions underneath.
export default function Statement() {
  return (
    <section className="statement" aria-label={statement.caption}>
      <p className="label statement-caption">
        <span aria-hidden="true">“</span> {statement.caption}
      </p>
      <figure>
        <SplitReveal as="blockquote" text={statement.quote} className="statement-quote" />
        <figcaption className="statement-by">
          <span>{profile.name}</span>
          {profile.role}
        </figcaption>
      </figure>
      <div className="statement-actions">
        <CvButton />
        <BookLink />
      </div>
    </section>
  );
}
