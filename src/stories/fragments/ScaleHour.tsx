export const ScaleHour = ({ text }) => (
  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: 10 }}>
    <div
      style={{
        width: 1,
        height: 20,
        backgroundColor: '#ccc',
      }}
    />
    <span style={{ fontFamily: 'Arial', fontSize: 14, marginTop: 4, color: '#999' }}>{text}</span>
  </div>
)
