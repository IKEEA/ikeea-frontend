export const getEmailFromToken = async (token) => {
    // TO DO 
    // Implement server-side fetching of the email
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (token === 'test') {
                resolve({value: 'test@email.com', errors: null});
            } else {
                resolve({errors: ['Such registration page does not exist...']});
            }
            
        }, 500)
    })
}