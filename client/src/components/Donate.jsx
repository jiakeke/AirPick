export default function Donate() {
  return (
    <>
      <div className="container py-5 mt-5">
        <div className="d-flex flex-wrap flex-column justify-content-center align-items-center">
          <h2 className="">Please Support Us!!!</h2>
          <form
            action="https://www.paypal.com/cgi-bin/webscr"
            method="post"
            target="_top"
          >
            <input type="hidden" name="cmd" value="_s-xclick" />
            <input
              type="hidden"
              name="hosted_button_id"
              value="BM9W499QRLTJU"
            />
            <table>
              <tr>
                <td>
                  <input
                    type="hidden"
                    name="on0"
                    value=" Your comments and advices:"
                  />
                  Your comments and advices:
                </td>
              </tr>
              <tr>
                <td>
                  <input type="text" name="os0" maxLength="200" />
                </td>
              </tr>
            </table>
            <input type="hidden" name="currency_code" value="USD" />
            <input
              type="image"
              src="https://www.paypalobjects.com/en_US/i/btn/btn_paynowCC_LG.gif"
              border="0"
              name="submit"
              title="PayPal"
              alt="buy now"
            />
          </form>
        </div>
      </div>
    </>
  );
}
