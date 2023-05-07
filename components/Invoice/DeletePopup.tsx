import { FC, useState } from 'react';
import styles from './styles/DeletePopup.module.css';
import { useModalState } from '../../state/form.state';
import { useRouter } from 'next/router';

const DeletePopup: FC<{ id?: string }> = ({ id }) => {
    const modalState = useModalState()
    const router = useRouter()
    const [loading, setLoading] = useState(false)
    const deleteInvoice = async (e: any) => {
        e.preventDefault()
        setLoading(true)
        await fetch("http://localhost:8080/invoices" + `/${id}` , { method: 'DELETE' })
            .catch(e => console.error(e))
        modalState.close()
        router.replace('/')
    }
    return (
        <>
            {modalState.get() &&
                <div className={styles.container}>
                    <section>
                        <h2>Confirm Deletion</h2>
                        <p>Are you sure you want to delete invoice #{id}? This action can not be undone.</p>
                        <div className={styles.buttonsDiv}>
                            <button className={styles.cancelButton} onClick={() => modalState.close()}>Cancel</button>
                            <button onClick={(e) => deleteInvoice(e)} className={styles.deleteButton}>
                                {!loading ? 'Delete' : <div className={styles.ldsEllipsis}><div></div><div></div><div></div><div></div></div>}
                            </button>
                        </div>
                    </section>
                </div>
            }
        </>
    )
}

export default DeletePopup
