

const BTestPage = ({ params }: { params: { handle: string}} ) => {
  return (
    <div>
      <h1>{params?.handle || 'test'}</h1>
    </div>
  )
}

export default BTestPage