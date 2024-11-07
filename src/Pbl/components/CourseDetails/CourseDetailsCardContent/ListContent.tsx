import styles from './CourseDetailsCardContent.module.sass';

export type Props = {
  data: string[];
  introduction?: string;
};

const ListContent = ({ data, introduction }: Props) => (
  <>
    {introduction && <p>{introduction}</p>}
    <ul className={styles.list}>
      {data.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  </>
);

export default ListContent;
