import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import BubblePage from "./BubblePage";
import Bubbles from "./Bubbles"
test("Fetches data and renders the bubbles", async () => {
  const {getByText, getAllByTestId, rerender} = render(<BubblePage />)

  rerender(<Bubbles colors={data} />)
   await waitFor(() => {
   const allBubbles = getAllByTestId(/bubbles/i)
   expect(allBubbles).toHaveLength(2);
   })
});


const data =  [ 
{
  "color":"blue",
  "code":{
     "hex":"#6093ca"
  },
  "id":10
},
{
  "color":"blueviolet",
  code:{
     "hex":"#8a2be2"
  },
  "id":11
}
]