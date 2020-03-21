@Component("doorState")
export class DoorState {
  closed: boolean = true;
  fraction: number = 0;
  openPos: Quaternion = Quaternion.Euler(0, 90, 0);
  closedPos: Quaternion = Quaternion.Euler(0, 0, 0);
}

// // a group to keep track of all entities with a DoorState component
const doors = engine.getComponentGroup(DoorState);

// // a system to carry out the rotation
export class RotatorSystem implements ISystem {
  update(dt: number) {
    // iterate over the doors in the component group
    for (let door of doors.entities) {
      // get some handy shortcuts
      let state = door.getComponent(DoorState);
      let transform = door.getComponent(Transform);

      // check if the rotation needs to be adjusted
      if (state.closed == false && state.fraction < 1) {
        state.fraction += dt;
        let rot = Quaternion.Slerp(
          state.closedPos,
          state.openPos,
          state.fraction
        );
        transform.rotation = rot;
      } else if (state.closed == true && state.fraction > 0) {
        state.fraction -= dt;
        let rot = Quaternion.Slerp(
          state.closedPos,
          state.openPos,
          state.fraction
        );
        transform.rotation = rot;
      }
    }
  }
}

// // // Add system to engine
engine.addSystem(new RotatorSystem());