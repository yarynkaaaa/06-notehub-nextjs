import css from './Footer.module.css';
export default function Footer() {
  return (
    <footer className={css.footer}>
  <div className={css.content}>
    <p>© {new Date().getFullYear()} NoteHub. All rights reserved.</p>
    <div className={css.wrap}>
      <p>Developer: Yaryna</p>
      <p>
        Contact us:
        <a href="mailto:usia98200@gamil.com">usia98200@gamil.com</a>
      </p>
    </div>
  </div>
</footer>

  );
}