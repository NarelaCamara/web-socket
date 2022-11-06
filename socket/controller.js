const TicketControl = require('../models/ticketControl')
const ticketControl = new TicketControl()

const socketController = (socket) => {

    socket.emit('ultimo-ticket', (ticketControl.ultimo))
    socket.broadcast.emit('estado-actual', (ticketControl.ultimos4))
    
    socket.on('siguiente-ticket', (payload, callback) => {
        const siguiente =  ticketControl.siguiente()
        callback(siguiente)
    })

    socket.on("atender-ticket", ({ escritorio }, callback) => {
        if(!escritorio){
            return {
                msg: 'El escritorio es obligatorio',
                ok: false
            }
            
        }
        const ticket = ticketControl.atenderTicket(escritorio)
        if(!ticket){
            return {
                msg: 'No hay tickets para atender',
                ok: false
            }
        }else{
            callback({
                ok: true, 
                ticket
            })
        }
    })


    socket.on("disconnect", () => {
    })
}

module.exports = {
    socketController
}