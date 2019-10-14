import React from "react";

import {
  Renderer,
  Express,
  Route,
} from "@root/index";
import { RouteNode, Elements } from "@root/types";

const handlerRoute = Object.freeze(() => {});

describe("Test routes", () => {
  test("Test simple router", () => {
    const compiled = Renderer.compile(
      <Express>
        <Route method="GET" path="/test" handle={handlerRoute} />
        <Route method="POST" path="/test" handle={handlerRoute} />
      </Express>
    ) as RouteNode[];

    expect(compiled[0].type).toBe(Elements.Route);
    expect(compiled[0].path).toBe("/test");
    expect(compiled[0].method).toBe("GET");
    expect(compiled[0].handle).toBe(handlerRoute);

    expect(compiled[1].type).toBe(Elements.Route);
    expect(compiled[1].path).toBe("/test");
    expect(compiled[1].method).toBe("POST");
    expect(compiled[1].handle).toBe(handlerRoute);
  });

  test("Test route with two childs", () => {
    const compiled = Renderer.compile(
      <Express>
        <Route path="/test">
          <Route method="GET" handle={handlerRoute} />
          <Route method="POST" handle={handlerRoute} />
        </Route>
      </Express>
    ) as RouteNode[];

    expect(compiled[0].type).toBe(Elements.Route);
    expect(compiled[0].path).toBe("/test");
    expect(compiled[0].method).toBe("GET");
    expect(compiled[0].handle).toBe(handlerRoute);

    expect(compiled[1].type).toBe(Elements.Route);
    expect(compiled[1].path).toBe("/test");
    expect(compiled[1].method).toBe("POST");
    expect(compiled[1].handle).toBe(handlerRoute);
  });

  test("Test nested routes", () => {
    const compiled = Renderer.compile(
      <Express>
        <Route path="/test">
          <Route method="GET" handle={handlerRoute} />
          <Route method="POST" handle={handlerRoute} />

          <Route method="GET" path="/test2" handle={handlerRoute} />
          <Route method="GET" path="/test3" handle={handlerRoute} />

          <Route path="/test5" handle={handlerRoute}>
            <Route method="GET" path="/test6" handle={handlerRoute} />
            <Route method="GET" path="/test7" handle={handlerRoute} />
            <Route method="GET" handle={handlerRoute} />

            <Route path="/test8" handle={handlerRoute}>
              <Route method="GET" path="/test9" handle={handlerRoute} />
              <Route method="POST" path="/test9" handle={handlerRoute} />
              <Route method="GET" handle={handlerRoute} />
            </Route>
          </Route>
        </Route>
      </Express>
    ) as RouteNode[];

    expect(compiled[0].type).toBe(Elements.Route);
    expect(compiled[0].path).toBe("/test");
    expect(compiled[0].method).toBe("GET");
    expect(compiled[0].handle).toBe(handlerRoute);

    expect(compiled[1].type).toBe(Elements.Route);
    expect(compiled[1].path).toBe("/test");
    expect(compiled[1].method).toBe("POST");
    expect(compiled[1].handle).toBe(handlerRoute);

    expect(compiled[2].type).toBe(Elements.Route);
    expect(compiled[2].path).toBe("/test/test2");
    expect(compiled[2].method).toBe("GET");
    expect(compiled[2].handle).toBe(handlerRoute);

    expect(compiled[3].type).toBe(Elements.Route);
    expect(compiled[3].path).toBe("/test/test3");
    expect(compiled[3].method).toBe("GET");
    expect(compiled[3].handle).toBe(handlerRoute);

    expect(compiled[4].type).toBe(Elements.Route);
    expect(compiled[4].path).toBe("/test/test5/test6");
    expect(compiled[4].method).toBe("GET");
    expect(compiled[4].handle).toBe(handlerRoute);

    expect(compiled[5].type).toBe(Elements.Route);
    expect(compiled[5].path).toBe("/test/test5/test7");
    expect(compiled[5].method).toBe("GET");
    expect(compiled[5].handle).toBe(handlerRoute);

    expect(compiled[6].type).toBe(Elements.Route);
    expect(compiled[6].path).toBe("/test/test5");
    expect(compiled[6].method).toBe("GET");
    expect(compiled[6].handle).toBe(handlerRoute);

    expect(compiled[7].type).toBe(Elements.Route);
    expect(compiled[7].path).toBe("/test/test5/test8/test9");
    expect(compiled[7].method).toBe("GET");
    expect(compiled[7].handle).toBe(handlerRoute);

    expect(compiled[8].type).toBe(Elements.Route);
    expect(compiled[8].path).toBe("/test/test5/test8/test9");
    expect(compiled[8].method).toBe("POST");
    expect(compiled[8].handle).toBe(handlerRoute);

    expect(compiled[9].type).toBe(Elements.Route);
    expect(compiled[9].path).toBe("/test/test5/test8");
    expect(compiled[9].method).toBe("GET");
    expect(compiled[9].handle).toBe(handlerRoute);
  });
});