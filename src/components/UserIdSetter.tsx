"use client";

import { useEffect } from "react";
import { useToast } from "./ui/useToast";
import { Odin } from "@/lib/OdinDB";

export default function UserIdSetter() {
  const { toast } = useToast();

  useEffect(() => {
    if (crypto?.randomUUID) {
      Odin.initUser(crypto.randomUUID())
        .catch(() => {
          toast({
            variant: "destructive",
            title: "Error",
            description: "Failed to setup user identification",
          });
        })
        .then((userKey) => {
          if (userKey) localStorage.setItem("odin_user", userKey);
        });
    }
  }, []);

  return <></>;
}
