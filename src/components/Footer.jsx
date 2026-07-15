import styles from './Footer.module.css';

export default function Footer() {
  return (
    <footer id="contact" className={styles.footer}>
      <div className={styles.left}>
        <span className={styles.name}>CHO SEO HYUN</span>
        <span className={styles.role}>Product Manager</span>
      </div>
      <div className={styles.center}>
        <span className={styles.sparkle}>✦</span>
      </div>
      <div className={styles.right}>
        <a href="mailto:hyuniii0920@gmail.com" className={styles.contact}>
          hyuniii0920@gmail.com
        </a>
        <span className={styles.copy}>© 2026 Seo Hyun Cho. All rights reserved.</span>
      </div>
    </footer>
  );
}
