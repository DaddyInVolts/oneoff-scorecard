import { useState } from 'react'
import { Button, Link, makeStyles, tokens } from '@fluentui/react-components'
import {
  Eye20Regular,
  ChevronRight20Regular,
  ChevronDown20Regular,
  Checkmark16Regular,
  DocumentBulletList20Regular,
  Clock16Regular,
} from '@fluentui/react-icons'
import { ScorecardDrawer } from './components/ScorecardDrawer'
import './App.css'

const useStyles = makeStyles({
  page: {
    padding: '32px',
    maxWidth: '1400px',
    margin: '0 auto',
  },
  card: {
    backgroundColor: '#fff',
    border: `1px solid ${tokens.colorNeutralStroke1}`,
    borderRadius: '4px',
    overflow: 'hidden',
  },
  rolloutHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    padding: '10px 16px',
    backgroundColor: '#dce6f1',
    cursor: 'pointer',
    userSelect: 'none',
    fontWeight: tokens.fontWeightSemibold,
    fontSize: tokens.fontSizeBase300,
    color: tokens.colorNeutralForeground1,
    border: 'none',
    width: '100%',
    textAlign: 'left',
    ':hover': { backgroundColor: '#cddaea' },
  },
  body: {
    padding: '28px 24px 32px',
  },
  sectionLabel: {
    fontWeight: tokens.fontWeightSemibold,
    fontSize: tokens.fontSizeBase300,
    marginBottom: '10px',
    color: tokens.colorNeutralForeground1,
  },
  experimentLink: {
    display: 'block',
    marginBottom: '20px',
    fontSize: tokens.fontSizeBase300,
  },
  buttonRow: {
    display: 'flex',
    gap: '8px',
    marginBottom: '28px',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
  },
  thead: {
    borderBottom: `1px solid ${tokens.colorNeutralStroke1}`,
  },
  th: {
    textAlign: 'left',
    padding: '8px 12px 10px 0',
    fontWeight: tokens.fontWeightSemibold,
    fontSize: tokens.fontSizeBase300,
    color: tokens.colorNeutralForeground1,
  },
  tr: {
    borderBottom: `1px solid ${tokens.colorNeutralStroke2}`,
  },
  td: {
    padding: '18px 12px 18px 0',
    fontSize: tokens.fontSizeBase300,
    verticalAlign: 'middle',
  },
  completedBadge: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '5px',
    backgroundColor: '#dff6dd',
    color: '#107c10',
    borderRadius: '4px',
    padding: '4px 10px',
    fontSize: tokens.fontSizeBase200,
    fontWeight: tokens.fontWeightSemibold,
  },
  requestedBadge: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '5px',
    backgroundColor: '#deecf9',
    color: '#0078d4',
    borderRadius: '4px',
    padding: '4px 10px',
    fontSize: tokens.fontSizeBase200,
    fontWeight: tokens.fontWeightSemibold,
  },
})

interface Scorecard {
  name: string
  period: string
  status: 'Completed' | 'Requested'
}

const initialScorecards: Scorecard[] = [
  { name: 'Bizchat Indicator Scorecard', period: '1 Day', status: 'Completed' },
  { name: 'Bizchat Indicator Scorecard', period: '1 Day', status: 'Completed' },
  { name: 'Bizchat Indicator Scorecard', period: '1 Day', status: 'Completed' },
  { name: 'Bizchat Core Scorecard', period: '1 Day', status: 'Completed' },
  { name: 'Bizchat Core Scorecard', period: '1 Day', status: 'Completed' },
]

export default function App() {
  const styles = useStyles()
  const [expanded, setExpanded] = useState(true)
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [scorecards, setScorecards] = useState<Scorecard[]>(initialScorecards)

  const handleDrawerSubmit = (name: string, period: string) => {
    setScorecards([{ name, period, status: 'Requested' }, ...scorecards])
    setDrawerOpen(false)
  }

  return (
    <>
      <div className={styles.page}>
        <div className={styles.card}>
          {/* Roll-out type collapsible header */}
          <button className={styles.rolloutHeader} onClick={() => setExpanded(e => !e)}>
            {expanded ? <ChevronDown20Regular /> : <ChevronRight20Regular />}
            Roll-out type
          </button>

          {expanded && (
            <div className={styles.body}>
              <div className={styles.sectionLabel}>Iris workspace experiments</div>

              <Link href="#" className={styles.experimentLink}>
                CreativeHoldoutAB: [TM] [WW] [Desktop] Returning users to prompt TM with auto
                submit prompt 2.0 - OCG 9284 | C: 5145511, L: 11415095
              </Link>

              <div className={styles.buttonRow}>
                <Button appearance="primary" icon={<Eye20Regular />}>
                  View configuration
                </Button>
                <Button
                  appearance="primary"
                  icon={<DocumentBulletList20Regular />}
                  onClick={() => setDrawerOpen(true)}
                >
                  Request One-off Scorecard
                </Button>
              </div>

              <table className={styles.table}>
                <thead className={styles.thead}>
                  <tr>
                    <th className={styles.th} style={{ width: '45%' }}>Scorecard Name</th>
                    <th className={styles.th} style={{ width: '20%' }}>Period</th>
                    <th className={styles.th}>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {scorecards.map((sc, i) => (
                    <tr key={i} className={styles.tr}>
                      <td className={styles.td}>
                        <Link href="#">{sc.name}</Link>
                      </td>
                      <td className={styles.td}>{sc.period}</td>
                      <td className={styles.td}>
                        {sc.status === 'Completed' ? (
                          <span className={styles.completedBadge}>
                            <Checkmark16Regular />
                            Completed
                          </span>
                        ) : (
                          <span className={styles.requestedBadge}>
                            <Clock16Regular />
                            Requested
                          </span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      <ScorecardDrawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        onSubmit={handleDrawerSubmit}
      />
    </>
  )
}
