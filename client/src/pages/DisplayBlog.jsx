import React, { useContext } from "react";
import { BlogContext } from "../store/BlogContext";

const DisplayBlog = () => {
  const { toDisplay } = useContext(BlogContext);
  return (
    <div className="w-3/4 m-auto bg-white p-4 rounded-lg shadow-2xl">
      <div className="mb-4">
        <h2 className="text-greenOne font-medium text-3xl text-center mb-2">{toDisplay.title} this is the title</h2>
        <div className="flex flex-col  items-center">
          <div className="font-medium max-w-fit ">{toDisplay.timestamp}</div>
          <div className=" max-w-fit mb-2"> <span>By -</span> <span className="text-greenOne font-medium text-lg"> {toDisplay.author}</span></div>
          <span className="font-medium border-2 rounded-md px-1 border-greenOne">{toDisplay.country}</span>
        </div>
      </div>
      <div className="">
        <img className='h-96 w-full rounded mb-4 object-fill' src={"http://localhost:3000/" + toDisplay.cover} alt="" />
      </div>
      <div className="break-all">
        {toDisplay.description}
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sequi,
        perspiciatis quasi? Voluptatibus, atque iure? Quia voluptates,
        voluptatibus facere quidem laboriosam repudiandae soluta hic cumque
        ducimus nulla officiis, reiciendis quam eos omnis, neque ipsum est
        exercitationem beatae blanditiis obcaecati repellat nobis delectus
        consectetur? Architecto deleniti modi beatae aut, nulla magnam aliquam
        repudiandae veritatis? Dolorum recusandae nemo accusantium doloremque ab
        harum nulla aut perferendis impedit reiciendis, et aliquam facilis,
        blanditiis iste odio, quae quaerat minima quasi quod omnis vero maxime
        dolores neque. Natus perspiciatis repudiandae debitis veniam impedit
        autem quidem dicta dignissimos aliquid, voluptates nisi pariatur.
        Reiciendis, omnis! Beatae ut aspernatur, atque in unde quisquam impedit
        quidem minima cum, voluptatum non nostrum excepturi ipsam numquam hic
        cumque aut assumenda? Aliquam praesentium doloremque optio fugiat eum
        earum ut dicta, sequi ratione veritatis recusandae ipsum culpa impedit
        minus? Voluptatum quia totam minima, minus dicta, enim architecto
        expedita est sed obcaecati deleniti. Nesciunt aut facere unde temporibus
        dolor, quis illo quam culpa cum enim libero inventore maxime id tempora
        dignissimos eaque. Vel vero voluptates omnis. Rem unde aliquid totam
        assumenda amet corporis. Quisquam porro necessitatibus officia, ab earum
        sequi in quos cumque ratione sunt qui aut architecto doloribus, vero ut,
        accusamus praesentium temporibus natus aspernatur?
      </div>
    </div>
  );
};

export default DisplayBlog;
