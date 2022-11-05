import React from "react";
import {useState} from "react";
import {useEffect} from "react";

function EditPlayer (options)
{
    const [editProcess, setEditProcess]= useState(false);

    useEffect(() =>
    {
        if (options.childRef && options.childRef.current && editProcess=== true)
            options.childRef.current.focus();
    })

    const choosePlayer= team =>
    {
        setEditProcess(true);
        options.editPlayer(options.player);
    }

    return 
    (
        <section>
            {editProcess ?
            (
                <div 
                    onBlur={team => setEditProcess(false)}>
                    {options.children}
                </div>
            ) : (
                <div
                    onClick={choosePlayer}>
                    <span>
                        {options.player}
                    </span>
                </div>
            )}
        </section>
    )
}

export default EditPlayer;
