function submitForm(event){
    console.log("hello")
    const form = document.querySelector('form')
    console.log(form.formdata)

    fetch('http://localhost:3000/add-favorite', {
        method:"patch"
    })
}

const Exempel = () => {
    return (
    <>
        <h1 style={{
            paddingTop: '300px',
        }}>HELLO</h1>

        <form method="POST">
            <label htmlFor="favorite"> vet inte</label>
            <input type="checkbox" id="favorite" name="favorite_id" value={1}/>
            <button type="button" onClick={submitForm}>lägg till</button>
        </form>
      </>
    );
  };

export default Exempel;
