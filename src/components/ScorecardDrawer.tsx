import { useState } from 'react'
import {
  OverlayDrawer,
  DrawerHeader,
  DrawerHeaderTitle,
  DrawerBody,
  Button,
  Input,
  Field,
  RadioGroup,
  Radio,
  Dropdown,
  Option,
  makeStyles,
  tokens,
} from '@fluentui/react-components'
import {
  Dismiss24Regular,
  Info16Regular,
} from '@fluentui/react-icons'
import { DatePicker } from '@fluentui/react-datepicker-compat'

// 30-min interval time options
const timeOptions: string[] = []
for (let h = 0; h < 24; h++) {
  for (let m = 0; m < 60; m += 30) {
    const hour12 = h % 12 || 12
    const ampm = h < 12 ? 'AM' : 'PM'
    timeOptions.push(`${hour12}:${m.toString().padStart(2, '0')} ${ampm}`)
  }
}

const assignmentUnits = [
  'User Id',
  'Tenant Id',
  'Device Id',
]

const scorecardOptions = [
  'Bizchat Core Scorecard',
  'Bizchat Indicator Scorecard',
  'Commercial Copilot Acquisition',
  'Commercial Copilot Acquisition for Leading Business Indicator (LBI)',
  'Commercial Copilot Agent',
  'Commercial Copilot App',
  'Commercial Copilot App - Mobile',
  'Commercial Copilot Engagement',
  'Commercial Copilot Engagement - All Mobile Apps',
  'Windows Guardrails – Commercial',
  'Windows Guardrails – Commercial [Use for holdout]',
  'Windows Guardrails – Consumer',
  'Windows Guardrails – Consumer [Use for holdout]',
]

const useStyles = makeStyles({
  drawerBody: {
    display: 'flex',
    flexDirection: 'column',
    padding: '0',
    overflowY: 'auto',
  },
  section: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
  },
  sectionTitle: {
    fontSize: tokens.fontSizeBase500,
    fontWeight: tokens.fontWeightSemibold,
    margin: '0',
  },
  helperText: {
    fontSize: tokens.fontSizeBase300,
    color: tokens.colorNeutralForeground1,
    margin: '0',
  },
  radioGroup: {
    gap: '4px',
  },
  assignmentDropdown: {
    width: '100%',
  },
  scorecardDropdown: {
    width: '100%',
  },
  metricSection: {
    display: 'flex',
    flexDirection: 'column',
    gap: '2px',
  },
  metricLabel: {
    fontSize: tokens.fontSizeBase300,
    fontWeight: tokens.fontWeightSemibold,
  },
  infoIcon: {
    verticalAlign: 'middle',
    color: tokens.colorNeutralForeground3,
  },
  dateRangeLabel: {
    fontSize: tokens.fontSizeBase300,
    fontWeight: tokens.fontWeightSemibold,
    color: tokens.colorNeutralForeground1,
  },
  dateTimeRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '4px',
    flexWrap: 'wrap',
  },
  dateLabel: {
    fontSize: tokens.fontSizeBase300,
    fontWeight: tokens.fontWeightSemibold,
    minWidth: '36px',
    color: tokens.colorNeutralForeground1,
  },
  datePicker: {
    minWidth: '150px',
  },
  timePicker: {
    minWidth: '110px',
  },

  footer: {
    padding: '16px 24px 24px',
    borderTop: `1px solid ${tokens.colorNeutralStroke1}`,
  },
})

interface Props {
  open: boolean
  onClose: () => void
  onSubmit: (name: string, period: string) => void
}

export function ScorecardDrawer({ open, onClose, onSubmit }: Props) {
  const styles = useStyles()

  const [name, setName] = useState('')
  const [nameError, setNameError] = useState(false)
  const [assignmentUnitValue, setAssignmentUnitValue] = useState('')
  const [assignmentUnitSelected, setAssignmentUnitSelected] = useState<string[]>([])
  const [selectedScorecards, setSelectedScorecards] = useState<string[]>([])
  const [scheduleType, setScheduleType] = useState('custom')
  const [startDate, setStartDate] = useState<Date | null | undefined>(new Date(2025, 11, 4))
  const [startTimeValue, setStartTimeValue] = useState('10:30 PM')
  const [startTimeSelected, setStartTimeSelected] = useState(['10:30 PM'])
  const [endDate, setEndDate] = useState<Date | null | undefined>(new Date(2026, 2, 23))
  const [endTimeValue, setEndTimeValue] = useState('2:30 PM')
  const [endTimeSelected, setEndTimeSelected] = useState(['2:30 PM'])

  const formatDate = (date?: Date | null) => {
    if (!date) return ''
    return date.toDateString() // e.g. "Thu Dec 04 2025"
  }

  const getPeriod = () => {
    if (!startDate || !endDate) return 'Custom'
    const days = Math.round(Math.abs(endDate.getTime() - startDate.getTime()) / 86400000)
    return `${days} Days`
  }

  const handleValidate = () => {
    if (!name.trim()) {
      setNameError(true)
      return
    }
    onSubmit(name.trim(), getPeriod())
    setName('')
    setNameError(false)
  }

  return (
    <OverlayDrawer
      open={open}
      onOpenChange={(_, data) => { if (!data.open) onClose() }}
      position="end"
      size="medium"
    >
      <DrawerHeader>
        <DrawerHeaderTitle
          action={
            <Button
              appearance="subtle"
              aria-label="Close"
              icon={<Dismiss24Regular />}
              onClick={onClose}
            />
          }
        >
          Scorecard Options
        </DrawerHeaderTitle>
      </DrawerHeader>

      <DrawerBody className={styles.drawerBody}>
        <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
        {/* ── Analysis Details ── */}
        <div className={styles.section}>
          <Field
            label="Name"
            validationState={nameError ? 'error' : 'none'}
            validationMessage={nameError ? 'Required' : undefined}
          >
            <Input
              placeholder="Provide a descriptive Analysis study name (e.g. MyTestScorecard for June)"
              value={name}
              onChange={(_, d) => {
                setName(d.value)
                if (d.value) setNameError(false)
              }}
            />
          </Field>
        </div>

        {/* ── Assignment Unit ── */}
        <div className={styles.section}>
          <Field
            label="Assignment Unit"
          >
            <Dropdown
              value={assignmentUnitValue}
              selectedOptions={assignmentUnitSelected}
              onOptionSelect={(_, d) => {
                setAssignmentUnitValue(d.optionText ?? '')
                setAssignmentUnitSelected([d.optionValue ?? ''])
              }}
              className={styles.assignmentDropdown}
            >
              {assignmentUnits.map(u => (
                <Option key={u} value={u}>{u}</Option>
              ))}
            </Dropdown>
          </Field>
        </div>

        {/* ── Scorecard ── */}
        <div className={styles.section}>
          <Field label="Scorecard">
            <Dropdown
              multiselect
              value={selectedScorecards.join(', ')}
              selectedOptions={selectedScorecards}
              onOptionSelect={(_, d) => {
                setSelectedScorecards(d.selectedOptions)
              }}
              className={styles.scorecardDropdown}
            >
              {scorecardOptions.map(s => (
                <Option key={s} value={s}>{s}</Option>
              ))}
            </Dropdown>
          </Field>
        </div>

        {/* ── Analysis Dates ── */}
        <div className={styles.section}>
          <RadioGroup
            value={scheduleType}
            onChange={(_, d) => setScheduleType(d.value)}
            className={styles.radioGroup}
          >
            <Radio value="automatic" label="Automatic Schedule" />
            <Radio value="custom" label="Custom Schedule (One off)" />
          </RadioGroup>

          {scheduleType === 'custom' && (
            <>
              <div className={styles.dateRangeLabel}>
                Select a time range for one-off analysis (timezone: GMT-0000 (UTC)).{' '}
                <Info16Regular className={styles.infoIcon} />
              </div>

              <div className={styles.dateTimeRow}>
                <span className={styles.dateLabel}>Start</span>
                <DatePicker
                  value={startDate}
                  onSelectDate={setStartDate}
                  formatDate={formatDate}
                  className={styles.datePicker}
                  placeholder="Start date"
                />
                <Dropdown
                  value={startTimeValue}
                  selectedOptions={startTimeSelected}
                  onOptionSelect={(_, d) => {
                    setStartTimeValue(d.optionText ?? '')
                    setStartTimeSelected([d.optionValue ?? ''])
                  }}
                  className={styles.timePicker}
                >
                  {timeOptions.map(t => <Option key={t} value={t}>{t}</Option>)}
                </Dropdown>
              </div>

              <div className={styles.dateTimeRow}>
                <span className={styles.dateLabel}>End</span>
                <DatePicker
                  value={endDate}
                  onSelectDate={setEndDate}
                  formatDate={formatDate}
                  className={styles.datePicker}
                  placeholder="End date"
                />
                <Dropdown
                  value={endTimeValue}
                  selectedOptions={endTimeSelected}
                  onOptionSelect={(_, d) => {
                    setEndTimeValue(d.optionText ?? '')
                    setEndTimeSelected([d.optionValue ?? ''])
                  }}
                  className={styles.timePicker}
                >
                  {timeOptions.map(t => <Option key={t} value={t}>{t}</Option>)}
                </Dropdown>
              </div>

              <p className={styles.helperText}>
                <strong>
                  This will create one scorecard using the data within the time window provided
                </strong>
              </p>
            </>
          )}
        </div>

        </div>{/* end sections wrapper */}

        {/* ── Validate ── */}
        <div className={styles.footer}>
          <Button appearance="primary" onClick={handleValidate}>
            Validate
          </Button>
        </div>
      </DrawerBody>
    </OverlayDrawer>
  )
}
