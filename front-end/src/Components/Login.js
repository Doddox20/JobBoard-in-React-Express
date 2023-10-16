function login({isOpen, onClose}) {

    return (
        isOpen && (
            <div className="modal" tabIndex="-1" role="dialog" style={{display: 'block'}}>
                <div className="modal-dialog modal-dialog-centered" role="document">
                    <div className="modal-content">
                        <div className="modal-header bg-dark text-white">
                            <h5 className="modal-title">Login</h5>
                            <button type="button" className="btn-close bg-white" data-bs-dismiss="modal"
                                    aria-label="Close" onClick={onClose}></button>
                        </div>
                        <div className="modal-body">
                            <form action="/login" method="post">
                                <div className="mb-3">
                                    <label htmlFor="email" className="form-label">Email address</label>
                                    <input type="email" className="form-control" id="email" name="email"
                                             aria-describedby="emailHelp"/>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="password" className="form-label">Password</label>
                                    <input type="password" className="form-control" id="password" name="password"/>
                                </div>
                                <button type="submit">Login</button>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal"
                                    onClick={onClose}>Close
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        ));
}

export default login;