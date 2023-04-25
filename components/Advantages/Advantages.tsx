import styles from './Advantages.module.css'
import { IAdvantagesProps } from './Advantages.props'
import CheckIcon from './check.svg'

export const Advantages = ({ advantages }: IAdvantagesProps): JSX.Element => {
  return (
    <>
      {advantages.map((a) => (
        <div key={a._id} className={styles.advantage}>
          <CheckIcon />
          <div className={styles.title}>{a.title}</div>
          <div className={styles.vline} />
          <div>{a.description}</div>
        </div>
      ))}
    </>
  )
}
